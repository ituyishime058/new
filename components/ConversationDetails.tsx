import React from 'react';
import { Conversation, User } from '../types.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';

interface ConversationDetailsProps {
    conversation: Conversation;
    onClose: () => void;
    onViewProfile: (user: User) => void;
}

const DetailItem: React.FC<{icon: string, label: string, children: React.ReactNode}> = ({icon, label, children}) => (
    <div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary mb-1">
            <Icon name={icon} className="w-4 h-4" />
            <span>{label}</span>
        </div>
        <div className="pl-6">{children}</div>
    </div>
);


const ConversationDetails: React.FC<ConversationDetailsProps> = ({ conversation, onClose, onViewProfile }) => {
    const user = conversation.user;
    
    return (
        <div className="w-80 border-l border-border-color flex flex-col h-full bg-primary">
            <header className="p-4 border-b border-border-color flex items-center space-x-4">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary">
                    <Icon name="XMark" className="w-5 h-5"/>
                </button>
                <h2 className="font-bold text-lg">Details</h2>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="flex flex-col items-center text-center">
                    <Avatar src={user.avatarUrl} alt={user.name} size="lg" isOnline={user.isOnline}/>
                    <p className="font-bold text-xl mt-3">{user.name}</p>
                    <p className="text-text-secondary">@{user.handle}</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={() => onViewProfile(user)} className="flex flex-col items-center text-text-secondary hover:text-accent">
                        <div className="p-3 bg-secondary rounded-full"><Icon name="UserCircle" className="w-6 h-6"/></div>
                        <span className="text-xs mt-1">Profile</span>
                    </button>
                     <button className="flex flex-col items-center text-text-secondary hover:text-accent">
                        <div className="p-3 bg-secondary rounded-full"><Icon name="Bell" className="w-6 h-6"/></div>
                        <span className="text-xs mt-1">Mute</span>
                    </button>
                </div>
                <div className="space-y-4">
                     <DetailItem icon="Photo" label="Shared Media">
                        <div className="grid grid-cols-3 gap-2">
                           {/* Placeholder images */}
                           <div className="aspect-square bg-secondary rounded-md"></div>
                           <div className="aspect-square bg-secondary rounded-md"></div>
                           <div className="aspect-square bg-secondary rounded-md"></div>
                        </div>
                    </DetailItem>
                    <DetailItem icon="PaperClip" label="Files">
                        <p className="text-sm text-text-secondary">No files shared yet.</p>
                    </DetailItem>
                </div>
            </div>
        </div>
    );
};

export default ConversationDetails;
