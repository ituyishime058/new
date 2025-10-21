import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message, User } from '../types.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';
import VoiceNotePlayer from './VoiceNotePlayer.tsx';
import FileAttachment from './FileAttachment.tsx';

interface ChatViewProps {
  conversation: Conversation | null;
  currentUser: User;
  onSendMessage: (text: string) => void;
  onViewProfile: (user: User) => void;
  onStartVideoCall: (user: User) => void;
  onStartAudioCall: (user: User) => void;
}

const ChatMessage: React.FC<{ message: Message, isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
    const bubbleClasses = isCurrentUser 
        ? 'bg-accent text-white rounded-br-none'
        : 'bg-secondary text-text-primary rounded-bl-none';

    return (
        <div className={`flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            {!isCurrentUser && <Avatar src={message.sender.avatarUrl} alt={message.sender.name} size="sm" />}
            <div className={`px-4 py-2 rounded-xl max-w-sm md:max-w-md ${bubbleClasses}`}>
                {message.text && <p>{message.text}</p>}
                {message.attachment && <FileAttachment attachment={message.attachment}/>}
                {message.voiceNote && <VoiceNotePlayer voiceNote={message.voiceNote} isCurrentUser={isCurrentUser}/>}
            </div>
        </div>
    )
};

const ChatView: React.FC<ChatViewProps> = ({ conversation, currentUser, onSendMessage, onViewProfile, onStartVideoCall, onStartAudioCall }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!conversation) {
    return (
      <div className="hidden md:flex flex-col items-center justify-center h-full bg-primary rounded-r-xl">
        <Icon name="ChatBubbleLeftRight" className="w-24 h-24 text-text-secondary/20" />
        <h2 className="text-xl font-bold mt-4">Select a conversation</h2>
        <p className="text-text-secondary">Start chatting with your friends and colleagues.</p>
      </div>
    );
  }

  const chatPartner = conversation.isGroup ? conversation.user : conversation.participants?.find(p => p.id !== currentUser.id) || conversation.user;

  return (
    <div className="flex flex-col h-full bg-primary md:rounded-r-xl">
        {/* Header */}
        <header className="flex items-center p-3 border-b border-border-color">
            <button onClick={() => onViewProfile(chatPartner)} className="flex items-center space-x-3 group">
                <Avatar src={chatPartner.avatarUrl} alt={chatPartner.name} size="md" isOnline={chatPartner.isOnline}/>
                <div>
                    <p className="font-bold text-text-primary group-hover:underline">{chatPartner.name}</p>
                    <p className="text-xs text-text-secondary">{chatPartner.isOnline ? 'Online' : 'Offline'}</p>
                </div>
            </button>
            <div className="ml-auto flex items-center space-x-2">
                <button onClick={() => onStartAudioCall(chatPartner)} className="p-2 rounded-full hover:bg-secondary"><Icon name="Phone" className="w-6 h-6"/></button>
                <button onClick={() => onStartVideoCall(chatPartner)} className="p-2 rounded-full hover:bg-secondary"><Icon name="VideoCamera" className="w-6 h-6"/></button>
                <button className="p-2 rounded-full hover:bg-secondary"><Icon name="EllipsisVertical" className="w-6 h-6"/></button>
            </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} isCurrentUser={msg.sender.id === currentUser.id}/>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <footer className="p-3 border-t border-border-color">
            <div className="flex items-center space-x-2 bg-secondary rounded-full px-2">
                <button className="p-2 rounded-full hover:bg-border-color"><Icon name="PaperClip" className="w-6 h-6 text-text-secondary"/></button>
                <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent py-2 focus:outline-none"
                />
                 <button className="p-2 rounded-full hover:bg-border-color"><Icon name="FaceSmile" className="w-6 h-6 text-text-secondary"/></button>
                <button onClick={handleSend} className="p-2 rounded-full bg-accent text-white hover:opacity-90">
                    <Icon name="PaperAirplane" className="w-6 h-6"/>
                </button>
            </div>
        </footer>
    </div>
  );
};

export default ChatView;
