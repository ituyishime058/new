
import React, { useState, useEffect } from 'react';
// FIX: Add file extension to imports.
import { conversations as initialConversations, nexusAiUser } from '../constants.ts';
import { Conversation, User } from '../types.ts';
import ChatView from '../components/ChatView';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import { formatDistanceToNow } from 'date-fns';


interface MessagesPageProps {
    onViewProfile: (user: User) => void;
}


const ConversationItem: React.FC<{ conversation: Conversation, isSelected: boolean, onSelect: () => void }> = ({ conversation, isSelected, onSelect }) => (
    <button onClick={onSelect} className={`w-full text-left p-4 flex items-center space-x-4 transition-colors ${isSelected ? 'bg-secondary' : 'hover:bg-secondary'}`}>
        <div className="relative">
            <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} size="md" isOnline={conversation.user.isOnline} />
            {conversation.unreadCount > 0 && conversation.user.id !== nexusAiUser.id && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-accent ring-2 ring-primary"></span>}
            {conversation.user.id === nexusAiUser.id && <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-gradient-to-r from-accent-start to-accent-end ring-2 ring-primary flex items-center justify-center"><Icon name="Sparkles" variant="solid" className="w-2 h-2 text-white" /></span>}
        </div>
        <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-baseline">
                <p className="font-bold text-text-primary truncate">{conversation.user.name}</p>
                <p className="text-xs text-text-secondary flex-shrink-0">{formatDistanceToNow(new Date(conversation.messages[conversation.messages.length - 1].timestamp), { addSuffix: true })}</p>
            </div>
            <p className="text-sm text-text-secondary truncate">{conversation.messages[conversation.messages.length - 1].text || 'Attachment'}</p>
        </div>
    </button>
);


const MessagesPage: React.FC<MessagesPageProps> = ({ onViewProfile }) => {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    useEffect(() => {
        const aiConversation = conversations.find(c => c.user.id === nexusAiUser.id);
        if (aiConversation) {
            setSelectedConversation(aiConversation);
        } else if (conversations.length > 0) {
            setSelectedConversation(conversations[0]);
        }
    }, []);

    return (
        <div className="grid grid-cols-12 gap-0 bg-primary shadow-md rounded-xl overflow-hidden">
            <div className={`col-span-12 md:col-span-4 border-r border-border-color ${selectedConversation ? 'hidden md:block' : 'block'}`}>
                <header className="p-4 border-b border-border-color flex items-center justify-between">
                    <h1 className="text-xl font-bold text-text-primary">Messages</h1>
                    <button className="p-2 rounded-full hover:bg-secondary"><Icon name="PencilSquare" className="w-6 h-6 text-text-secondary" /></button>
                </header>
                <div className="h-[calc(100vh-14.5rem)] md:h-[calc(100vh-12rem)] overflow-y-auto">
                    {conversations.map(c => 
                        <ConversationItem 
                            key={c.id} 
                            conversation={c} 
                            isSelected={c.id === selectedConversation?.id} 
                            onSelect={() => setSelectedConversation(c)}
                        />
                    )}
                </div>
            </div>
            <div className={`col-span-12 md:col-span-8 ${selectedConversation ? 'block' : 'hidden md:block'}`}>
                {selectedConversation ? (
                    <ChatView 
                        conversation={selectedConversation} 
                        onBack={() => setSelectedConversation(null)}
                        onViewProfile={onViewProfile}
                    />
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                         <Icon name="ChatBubbleOvalLeftEllipsis" className="w-24 h-24 text-gray-300" />
                         <h2 className="mt-4 text-xl font-bold">Your Messages</h2>
                         <p className="mt-2 text-text-secondary">Select a conversation to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
