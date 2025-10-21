
import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message, User } from '../types';
import { currentUser, nexusAiUser } from '../constants';
import Avatar from './Avatar';
import Icon from './Icon';
import { getAiChatResponse } from '../services/geminiService';
import AudioCallModal from './AudioCallModal';
import VideoCallModal from './VideoCallModal';
import FileAttachment from './FileAttachment';
import VoiceNotePlayer from './VoiceNotePlayer';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatViewProps {
  conversation: Conversation;
  onBack: () => void;
  onViewProfile: (user: User) => void;
}

// Sub-component for displaying a message bubble with interactive, on-hover actions
const MessageBubble: React.FC<{
  message: Message,
  isCurrentUser: boolean,
  onReply: (message: Message) => void,
  onDelete: (messageId: string) => void,
  onHover: (messageId: string | null) => void,
  isHovered: boolean,
}> = ({ message, isCurrentUser, onReply, onDelete, onHover, isHovered }) => {
  return (
    <div 
      className={`flex items-end gap-2 group ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => onHover(message.id)}
      onMouseLeave={() => onHover(null)}
    >
      {!isCurrentUser && <Avatar src={message.sender.avatarUrl} alt={message.sender.name} size="sm" isOnline={message.sender.isOnline}/>}
      
      <AnimatePresence>
      {isHovered && !isCurrentUser && (
          <motion.div initial={{opacity: 0, x: 10}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 10}} className="flex items-center">
             <button onClick={() => onReply(message)} className="p-1.5 rounded-full hover:bg-secondary"><Icon name="ArrowUturnLeft" className="w-4 h-4 text-text-secondary"/></button>
          </motion.div>
      )}
      </AnimatePresence>

      <div className={`max-w-xs lg:max-w-md px-1 py-1 rounded-2xl relative ${isCurrentUser ? 'bg-gradient-to-r from-accent-start to-accent-end text-white rounded-br-none' : 'bg-secondary rounded-bl-none'}`}>
        <div className="px-3 py-1">
          {message.replyTo && (
            <div className={`border-l-2 ${isCurrentUser ? 'border-white/50' : 'border-accent'} pl-2 text-xs opacity-80 mb-1`}>
                <p className="font-bold">{message.replyTo.sender.name}</p>
                <p className="truncate">{message.replyTo.text || 'Attachment'}</p>
            </div>
          )}
          {message.attachment?.type === 'image' && <img src={message.attachment.url} className="rounded-lg my-1 max-w-full" alt="attachment"/>}
          {message.attachment?.type === 'file' && <FileAttachment attachment={message.attachment} />}
          {message.voiceNote && <VoiceNotePlayer voiceNote={message.voiceNote} isCurrentUser={isCurrentUser}/>}
          {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
        </div>
      </div>
      
      <AnimatePresence>
      {isHovered && isCurrentUser && (
          <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -10}} className="flex items-center">
             <button onClick={() => onReply(message)} className="p-1.5 rounded-full hover:bg-secondary"><Icon name="ArrowUturnLeft" className="w-4 h-4 text-text-secondary"/></button>
             <button onClick={() => onDelete(message.id)} className="p-1.5 rounded-full hover:bg-secondary"><Icon name="Trash" className="w-4 h-4 text-text-secondary"/></button>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};


const ChatView: React.FC<ChatViewProps> = ({ conversation, onBack, onViewProfile }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isAudioCallOpen, setAudioCallOpen] = useState(false);
  const [isVideoCallOpen, setVideoCallOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<number | null>(null);

  const isAiChat = conversation.user.id === nexusAiUser.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(scrollToBottom, [messages, isAiTyping]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  }, [isRecording]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
      replyTo: replyingTo || undefined,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setReplyingTo(null);
    
    if (isAiChat) {
        setIsAiTyping(true);
        const aiResponseText = await getAiChatResponse(conversation.id, newMessage);
        const aiMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            sender: nexusAiUser,
            text: aiResponseText,
            timestamp: new Date().toISOString(),
            read: true,
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsAiTyping(false);
    }
  };

  const handleSendAttachment = (file: File) => {
      const message: Message = {
          id: `msg-${Date.now()}`,
          sender: currentUser,
          text: '',
          timestamp: new Date().toISOString(),
          read: true,
          attachment: {
              type: file.type.startsWith('image/') ? 'image' : 'file',
              url: URL.createObjectURL(file),
              fileName: file.name,
              fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          }
      };
      setMessages(prev => [...prev, message]);
  }
  
  const handleSendVoiceNote = (duration: number) => {
    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: '',
      timestamp: new Date().toISOString(),
      read: true,
      voiceNote: {
        url: '#', // Placeholder URL
        duration: duration,
      }
    };
    setMessages(prev => [...prev, message]);
  }

  const handleDeleteMessage = (messageId: string) => {
      setMessages(prev => prev.filter(m => m.id !== messageId));
  }
  
  const handleToggleRecord = () => {
    if (isRecording) {
      // Stop recording and send
      setIsRecording(false);
      if (recordingTime > 0) {
          handleSendVoiceNote(recordingTime);
      }
    } else {
      // Start recording
      setIsRecording(true);
    }
  }
  
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }


  return (
    <>
    <div className="bg-primary shadow-md rounded-xl flex flex-col h-full max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)]">
      <header className="p-4 border-b border-border-color flex items-center space-x-4">
        <button onClick={onBack} className="md:hidden p-2 -ml-2 rounded-full hover:bg-secondary">
          <Icon name="ArrowLeft" className="w-6 h-6" />
        </button>
        <button onClick={() => onViewProfile(conversation.user)}>
            <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} isOnline={conversation.user.isOnline && !isAiChat} />
        </button>
        <div>
            <button onClick={() => onViewProfile(conversation.user)} className="font-bold text-text-primary hover:underline">{conversation.user.name}</button>
            <p className="text-sm text-text-secondary">@{conversation.user.handle}</p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
            {!isAiChat && (
                <>
                <button onClick={() => setAudioCallOpen(true)} className="p-2 rounded-full hover:bg-secondary"><Icon name="Phone" className="w-6 h-6 text-text-secondary" /></button>
                <button onClick={() => setVideoCallOpen(true)} className="p-2 rounded-full hover:bg-secondary"><Icon name="VideoCamera" className="w-6 h-6 text-text-secondary" /></button>
                </>
            )}
            <div className="relative">
                <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 rounded-full hover:bg-secondary"><Icon name="EllipsisVertical" className="w-6 h-6 text-text-secondary" /></button>
                <AnimatePresence>
                {isSettingsOpen && (
                    <motion.div initial={{opacity:0, y: -10}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -10}} className="absolute top-full right-0 mt-2 w-56 bg-primary shadow-lg rounded-lg border border-border-color z-10">
                        <button className="w-full text-left px-4 py-2 hover:bg-secondary flex items-center space-x-3"><Icon name="UserCircle" className="w-5 h-5"/><span>View Profile</span></button>
                        <button className="w-full text-left px-4 py-2 hover:bg-secondary flex items-center space-x-3"><Icon name="MagnifyingGlass" className="w-5 h-5"/><span>Search</span></button>
                        <button className="w-full text-left px-4 py-2 hover:bg-secondary flex items-center space-x-3 text-red-500"><Icon name="Trash" className="w-5 h-5"/><span>Delete Chat</span></button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => <MessageBubble key={message.id} message={message} isCurrentUser={message.sender.id === currentUser.id} onReply={setReplyingTo} onDelete={handleDeleteMessage} onHover={setHoveredMessageId} isHovered={hoveredMessageId === message.id}/>)}
        {isAiTyping && (
            <div className="flex items-end gap-2 justify-start">
                <Avatar src={nexusAiUser.avatarUrl} alt={nexusAiUser.name} size="sm" />
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-secondary rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-border-color">
        <AnimatePresence>
        {replyingTo && (
            <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}} className="bg-secondary p-2 rounded-t-lg flex justify-between items-center text-sm overflow-hidden">
                <div className="border-l-2 border-accent pl-2">
                    <p className="font-bold">Replying to {replyingTo.sender.name}</p>
                    <p className="text-text-secondary truncate">{replyingTo.text || 'Attachment'}</p>
                </div>
                <button onClick={() => setReplyingTo(null)} className="p-1 rounded-full hover:bg-background"><Icon name="XMark" className="w-4 h-4" /></button>
            </motion.div>
        )}
        </AnimatePresence>
        <div className={`flex items-center space-x-2 transition-all duration-300 ${isRecording ? 'bg-red-500/10 p-2 rounded-full' : ''}`}>
          <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && handleSendAttachment(e.target.files[0])} className="hidden" />
          
          {!isRecording &&
            <>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-secondary"><Icon name="PaperClip" className="w-6 h-6 text-text-secondary" /></button>
            <form onSubmit={handleSendMessage} className="w-full">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-secondary border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isAiTyping}
            />
            </form>
            </>
          }
           
          {isRecording && (
              <div className="flex items-center w-full">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <p className="font-mono text-text-primary">{formatRecordingTime(recordingTime)}</p>
              </div>
          )}

          {!newMessage.trim() && (
              <button type="button" onClick={handleToggleRecord} className="p-2 rounded-full hover:bg-secondary">
                  <Icon name={isRecording ? 'StopCircle' : 'Microphone'} className={`w-6 h-6 ${isRecording ? 'text-red-500' : 'text-text-secondary'}`} />
              </button>
          )}

          {!!newMessage.trim() && !isRecording && (
            <button type="button" onClick={handleSendMessage} className="p-2 rounded-full hover:bg-secondary disabled:opacity-50" disabled={!newMessage.trim() || isAiTyping}>
                <Icon name="PaperAirplane" className="w-6 h-6 text-accent" />
            </button>
          )}
        </div>
      </footer>
    </div>
    <AudioCallModal isOpen={isAudioCallOpen} user={conversation.user} onClose={() => setAudioCallOpen(false)} />
    <VideoCallModal isOpen={isVideoCallOpen} user={conversation.user} onClose={() => setVideoCallOpen(false)} />
    </>
  );
};

export default ChatView;
