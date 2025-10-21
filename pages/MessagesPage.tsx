import React, { useState } from 'react';
import { conversations as initialConversations, currentUser } from '../constants.ts';
import { Conversation, User } from '../types.ts';
import Avatar from '../components/Avatar.tsx';
import Icon from '../components/Icon.tsx';
import ChatView from '../components/ChatView.tsx';
import VideoCallModal from '../components/VideoCallModal.tsx';
import AudioCallModal from '../components/AudioCallModal.tsx';

interface MessagesPageProps {
  onViewProfile: (user: User) => void;
}

const ConversationItem: React.FC<{ conversation: Conversation, isActive: boolean, onClick: () => void }> = ({ conversation, isActive, onClick }) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    
    return (
        <button 
            onClick={onClick} 
            className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${isActive ? 'bg-secondary' : 'hover:bg-secondary'}`}
        >
            <div className="relative">
                <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} size="md" isOnline={conversation.user.isOnline} />
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-text-primary truncate">{conversation.user.name}</p>
                    <p className="text-xs text-text-secondary">{new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-text-secondary truncate">{lastMessage.text}</p>
                    {conversation.unreadCount > 0 && 
                        <span className="bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{conversation.unreadCount}</span>
                    }
                </div>
            </div>
        </button>
    );
};

const MessagesPage: React.FC<MessagesPageProps> = ({ onViewProfile }) => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversations[0]?.id || null);
  const [isAudioCallOpen, setAudioCallOpen] = useState(false);
  const [isVideoCallOpen, setVideoCallOpen] = useState(false);
  const [callUser, setCallUser] = useState<User | null>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (text: string) => {
    if (!selectedConversationId) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      text,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversationId) {
        return { ...conv, messages: [...conv.messages, newMessage] };
      }
      return conv;
    }));
  };

  const startCall = (user: User, type: 'audio' | 'video') => {
      setCallUser(user);
      if (type === 'audio') setAudioCallOpen(true);
      if (type === 'video') setVideoCallOpen(true);
  }

  return (
    <>
      <div className="bg-primary shadow-md rounded-xl flex h-[calc(100vh-10rem)]">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r border-border-color flex flex-col">
            <header className="p-4 border-b border-border-color">
                <h1 className="text-xl font-bold text-text-primary">Messages</h1>
            </header>
            <div className="p-2">
                 <div className="relative">
                    <input type="text" placeholder="Search messages" className="w-full bg-secondary rounded-full py-2 pl-10 pr-4 focus:outline-none"/>
                    <Icon name="MagnifyingGlass" className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2"/>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => (
                    <ConversationItem 
                        key={conv.id} 
                        conversation={conv}
                        isActive={conv.id === selectedConversationId}
                        onClick={() => setSelectedConversationId(conv.id)}
                    />
                ))}
            </div>
        </div>
        {/* Chat View */}
        <div className="hidden md:block w-2/3">
            <ChatView 
              conversation={selectedConversation || null} 
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onViewProfile={onViewProfile}
              onStartAudioCall={(user) => startCall(user, 'audio')}
              onStartVideoCall={(user) => startCall(user, 'video')}
            />
        </div>
      </div>
      <AudioCallModal isOpen={isAudioCallOpen} user={callUser} onClose={() => setAudioCallOpen(false)} />
      <VideoCallModal isOpen={isVideoCallOpen} user={callUser} onClose={() => setVideoCallOpen(false)} />
    </>
  );
};

export default MessagesPage;
