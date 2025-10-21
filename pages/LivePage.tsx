
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality } from "@google/genai";
// FIX: Add file extension to import.
import { nexusAiUser, currentUser } from '../constants.ts';
import * as AudioUtils from '../utils/audio';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';

type ConversationTurn = {
    speaker: 'user' | 'model';
    text: string;
};

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'disconnected';

const LivePage: React.FC = () => {
    const [connectionState, setConnectionState] = useState<ConnectionState>('idle');
    const [conversation, setConversation] = useState<ConversationTurn[]>([]);
    
    const sessionPromise = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContext = useRef<AudioContext | null>(null);
    const outputAudioContext = useRef<AudioContext | null>(null);
    const scriptProcessor = useRef<ScriptProcessorNode | null>(null);
    const mediaStream = useRef<MediaStream | null>(null);
    const mediaStreamSource = useRef<MediaStreamAudioSourceNode | null>(null);

    const stopSession = useCallback(() => {
        sessionPromise.current?.then((session) => {
            session.close();
        });
        sessionPromise.current = null;

        inputAudioContext.current?.close().catch(console.error);
        outputAudioContext.current?.close().catch(console.error);
        
        scriptProcessor.current?.disconnect();
        mediaStreamSource.current?.disconnect();
        mediaStream.current?.getTracks().forEach(track => track.stop());
        
        inputAudioContext.current = null;
        outputAudioContext.current = null;
        scriptProcessor.current = null;
        mediaStreamSource.current = null;
        mediaStream.current = null;

        setConnectionState('idle');
    }, []);
    
    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            stopSession();
        };
    }, [stopSession]);
    
    const startSession = async () => {
        setConnectionState('connecting');
        setConversation([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            let currentInputTranscription = '';
            let currentOutputTranscription = '';
            
            let nextStartTime = 0;
            const sources = new Set<AudioBufferSourceNode>();

            sessionPromise.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: async () => {
                        setConnectionState('connected');
                        inputAudioContext.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
                        outputAudioContext.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
                        
                        mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                        mediaStreamSource.current = inputAudioContext.current.createMediaStreamSource(mediaStream.current);
                        scriptProcessor.current = inputAudioContext.current.createScriptProcessor(4096, 1, 1);
                        
                        scriptProcessor.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = AudioUtils.createBlob(inputData);
                            sessionPromise.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        mediaStreamSource.current.connect(scriptProcessor.current);
                        scriptProcessor.current.connect(inputAudioContext.current.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // Handle transcriptions
                        if (message.serverContent?.inputTranscription) {
                            const text = message.serverContent.inputTranscription.text;
                            currentInputTranscription += text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            const text = message.serverContent.outputTranscription.text;
                            currentOutputTranscription += text;
                        }

                        if (message.serverContent?.turnComplete) {
                            if (currentInputTranscription) {
                                setConversation(prev => [...prev, { speaker: 'user', text: currentInputTranscription.trim() }]);
                            }
                            if (currentOutputTranscription) {
                                setConversation(prev => [...prev, { speaker: 'model', text: currentOutputTranscription.trim() }]);
                            }
                            currentInputTranscription = '';
                            currentOutputTranscription = '';
                        }
                        
                        // Handle audio output
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && outputAudioContext.current) {
                            nextStartTime = Math.max(nextStartTime, outputAudioContext.current.currentTime);
                            const audioBuffer = await AudioUtils.decodeAudioData(AudioUtils.decode(base64Audio), outputAudioContext.current, 24000, 1);
                            const source = outputAudioContext.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContext.current.destination);
                            source.addEventListener('ended', () => sources.delete(source));
                            source.start(nextStartTime);
                            nextStartTime += audioBuffer.duration;
                            sources.add(source);
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setConnectionState('error');
                        stopSession();
                    },
                    onclose: (e: CloseEvent) => {
                        setConnectionState('disconnected');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    outputAudioTranscription: {},
                    inputAudioTranscription: {},
                    systemInstruction: 'You are Nexus AI, a helpful and friendly voice assistant integrated into the Nexus social platform. Keep your responses conversational and concise.',
                },
            });

        } catch (error) {
            console.error('Failed to start session:', error);
            setConnectionState('error');
        }
    };
    
    const renderConnectionButton = () => {
        switch (connectionState) {
            case 'idle':
            case 'disconnected':
            case 'error':
                return (
                    <button onClick={startSession} className="bg-gradient-to-r from-accent-start to-accent-end text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center space-x-3">
                        <Icon name="Microphone" className="w-6 h-6" />
                        <span>Start Voice Session</span>
                    </button>
                );
            case 'connecting':
                return (
                     <button disabled className="bg-gray-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-3 cursor-not-allowed">
                        <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                        <span>Connecting...</span>
                    </button>
                );
            case 'connected':
                return (
                    <button onClick={stopSession} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-opacity flex items-center space-x-3">
                         <Icon name="PhoneXMark" className="w-6 h-6" />
                         <span>End Session</span>
                    </button>
                );
        }
    };
    
    return (
        <div className="bg-primary shadow-md rounded-xl p-6 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <Avatar src={nexusAiUser.avatarUrl} alt="Nexus AI" size="lg" />
            <h1 className="text-3xl font-bold mt-4">Nexus AI Live</h1>
            <p className="text-text-secondary mt-2 mb-8">Talk with your AI assistant in real-time.</p>
            
            <div className="w-full max-w-2xl h-64 bg-secondary rounded-lg p-4 overflow-y-auto mb-8 border border-border-color">
                {conversation.length === 0 && connectionState !== 'connected' && (
                    <div className="h-full flex items-center justify-center text-text-secondary">
                        <p>Press "Start Voice Session" to begin.</p>
                    </div>
                )}
                {conversation.map((turn, index) => (
                    <div key={index} className={`flex items-start gap-3 my-2 ${turn.speaker === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar src={turn.speaker === 'user' ? currentUser.avatarUrl : nexusAiUser.avatarUrl} alt={turn.speaker} size="sm" />
                        <div className={`px-4 py-2 rounded-xl max-w-sm ${turn.speaker === 'user' ? 'bg-accent/20 rounded-br-none' : 'bg-background rounded-bl-none'}`}>
                            <p>{turn.text}</p>
                        </div>
                    </div>
                ))}
                {connectionState === 'connected' && conversation.length > 0 && (
                    <div className="flex items-center justify-center text-text-secondary py-2">
                        <Icon name="Microphone" className="w-5 h-5 text-red-500 animate-pulse" />
                        <span className="ml-2">Listening...</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center">
                {renderConnectionButton()}
                {connectionState === 'error' && <p className="text-red-500 mt-4">Could not connect. Please check microphone permissions and try again.</p>}
            </div>
        </div>
    );
};

export default LivePage;