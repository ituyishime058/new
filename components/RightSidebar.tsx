
import React from 'react';
import { conversations, nexusAiUser } from '../constants';
import { User, Conversation } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
import TrendingTopics from './TrendingTopics';
import { formatDistanceToNow } from 'date-fns';

interface RightSidebarProps {
  onViewProfile: (user: User) => void;
  onOpenChat: (conversation: Conversation) => void;
}

const ConversationItem: React.FC<{ conversation: Conversation, onOpenChat: () => void }> = ({ conversation, onOpenChat }) => (
    <button onClick={onOpenChat} className="w-full flex items-center space-x-3 text-left hover:bg-secondary p-2 rounded-lg transition-colors">
        <div className="relative">
            <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} size="md" isOnline={conversation.user.isOnline} />
             {conversation.user.id === nexusAiUser.id && <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-gradient-to-r from-accent-start to-accent-end ring-2 ring-primary flex items-center justify-center"><Icon name="Sparkles" variant="solid" className="w-2 h-2 text-white" /></span>}
        </div>
        <div className="flex-1 overflow-hidden">
             <div className="flex justify-between items-baseline">
                <p className="font-semibold text-text-primary truncate">{conversation.user.name}</p>
                 <p className="text-xs text-text-secondary flex-shrink-0">{formatDistanceToNow(new Date(conversation.messages[conversation.messages.length - 1].timestamp), { addSuffix: true })}</p>
            </div>
            <p className="text-sm text-text-secondary truncate">{conversation.messages[conversation.messages.length - 1].text || 'Attachment'}</p>
        </div>
    </button>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ onViewProfile, onOpenChat }) => {
  return (
    <div className="p-2 flex flex-col space-y-6 sticky top-20 h-[calc(100vh-6rem)]">
      <TrendingTopics />
      
      <div className="bg-primary p-4 rounded-xl shadow-sm flex-1 flex flex-col">
        <h2 className="font-bold text-text-primary mb-4">Messages</h2>
        <div className="space-y-2 flex-1 overflow-y-auto -mr-2 pr-2">
          {conversations.map(conv => (
            <ConversationItem key={conv.id} conversation={conv} onOpenChat={() => onOpenChat(conv)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
