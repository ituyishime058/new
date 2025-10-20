
import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message, User } from '../types';
import { currentUser, nexusAiUser } from '../constants';
import Avatar from './Avatar';
import Icon from './Icon';
import { getAiChatResponse } from '../services/geminiService';
import AudioCallModal from './AudioCallModal';
import VideoCallModal from './VideoCallModal';

interface ChatViewProps {
  conversation: Conversation;
  onBack: () => void;
  onViewProfile: (user: User) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ conversation, onBack, onViewProfile }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isAudioCallOpen, setAudioCallOpen] = useState(false);
  const [isVideoCallOpen, setVideoCallOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAiChat = conversation.user.id === nexusAiUser.id;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(scrollToBottom, [messages, isAiTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
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

  return (
    <>
    <div className="bg-primary shadow-md rounded-xl flex flex-col h-full max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)]">
      <header className="p-4 border-b border-border-color flex items-center space-x-4">
        <button onClick={onBack} className="md:hidden p-2 -ml-2 rounded-full hover:bg-secondary">
          <Icon name="ArrowLeft" className="w-6 h-6" />
        </button>
        <button onClick={() => onViewProfile(conversation.user)}>
            <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} />
        </button>
        <div>
            <button onClick={() => onViewProfile(conversation.user)} className="font-bold text-text-primary hover:underline">{conversation.user.name}</button>
            <p className="text-sm text-text-secondary">@{conversation.user.handle}</p>
        </div>
        {!isAiChat && (
            <div className="ml-auto flex items-center space-x-2">
                <button onClick={() => setAudioCallOpen(true)} className="p-2 rounded-full hover:bg-secondary"><Icon name="Phone" className="w-6 h-6 text-text-secondary" /></button>
                <button onClick={() => setVideoCallOpen(true)} className="p-2 rounded-full hover:bg-secondary"><Icon name="VideoCamera" className="w-6 h-6 text-text-secondary" /></button>
            </div>
        )}
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            {message.sender.id !== currentUser.id && <Avatar src={message.sender.avatarUrl} alt={message.sender.name} size="sm" />}
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.sender.id === currentUser.id ? 'bg-gradient-to-r from-accent-start to-accent-end text-white rounded-br-none' : 'bg-secondary rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
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
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button type="button" className="p-2 rounded-full hover:bg-secondary"><Icon name="PaperClip" className="w-6 h-6 text-text-secondary" /></button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-secondary border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            disabled={isAiTyping}
          />
          <button type="submit" className="p-2 rounded-full hover:bg-secondary disabled:opacity-50" disabled={!newMessage.trim() || isAiTyping}>
            <Icon name="PaperAirplane" className="w-6 h-6 text-accent" />
          </button>
        </form>
      </footer>
    </div>
    <AudioCallModal isOpen={isAudioCallOpen} user={conversation.user} onClose={() => setAudioCallOpen(false)} />
    <VideoCallModal isOpen={isVideoCallOpen} user={conversation.user} onClose={() => setVideoCallOpen(false)} />
    </>
  );
};

export default ChatView;
