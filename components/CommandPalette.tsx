
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Add file extension to imports.
import { users, conversations } from '../constants.ts';
import { User, Conversation } from '../types.ts';
import Icon from './Icon';
import Avatar from './Avatar';

type Page = 'home' | 'profile' | 'notifications' | 'explore' | 'settings' | 'reels' | 'bookmarks' | 'live';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (page: Page) => void;
    onViewProfile: (user: User) => void;
    onOpenChat: (conversation: Conversation) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate, onViewProfile, onOpenChat }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setQuery(''), 200);
        }
    }, [isOpen]);

    const navigationActions = [
        { name: 'Home', icon: 'Home', action: () => onNavigate('home') },
        { name: 'Explore', icon: 'GlobeAlt', action: () => onNavigate('explore') },
        { name: 'Settings', icon: 'Cog6Tooth', action: () => onNavigate('settings') },
        { name: 'Your Profile', icon: 'UserCircle', action: () => onNavigate('profile') },
    ];
    
    const filteredResults = useMemo(() => {
        const q = query.toLowerCase();
        if (!q) return { actions: [], users: [] };

        const filteredActions = navigationActions.filter(a => a.name.toLowerCase().includes(q));
        const filteredUsers = users.filter(u => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));

        return { actions: filteredActions, users: filteredUsers };
    }, [query]);

    const handleUserSelect = (user: User) => {
        const conversation = conversations.find(c => c.user.id === user.id);
        if (conversation) {
            onOpenChat(conversation);
        } else {
            // In a real app, you might create a new conversation here
            onViewProfile(user);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex justify-center pt-[20vh] z-50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: -20, opacity: 0 }}
                        className="bg-primary rounded-xl w-full max-w-xl h-96 shadow-2xl flex flex-col border border-border-color"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-3 border-b border-border-color flex items-center space-x-3">
                            <Icon name="MagnifyingGlass" className="w-5 h-5 text-text-secondary" />
                            <input
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search for users or actions..."
                                autoFocus
                                className="w-full bg-transparent focus:outline-none"
                            />
                             <div className="text-xs bg-secondary text-text-secondary px-1.5 py-0.5 rounded-md border border-border-color">ESC</div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
                           {query && (
                                <>
                                {filteredResults.actions.length > 0 && <h3 className="text-xs font-bold text-text-secondary px-2 py-1 uppercase">Actions</h3>}
                                {filteredResults.actions.map(action => (
                                    <button key={action.name} onClick={action.action} className="w-full text-left flex items-center space-x-3 p-2 rounded-md hover:bg-secondary">
                                        <Icon name={action.icon} className="w-5 h-5" />
                                        <span>{action.name}</span>
                                    </button>
                                ))}
                                {filteredResults.users.length > 0 && <h3 className="text-xs font-bold text-text-secondary px-2 py-1 uppercase mt-2">Users</h3>}
                                {filteredResults.users.map(user => (
                                     <button key={user.id} onClick={() => handleUserSelect(user)} className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-secondary">
                                        <div className="flex items-center space-x-3">
                                            <Avatar src={user.avatarUrl} alt={user.name} size="sm" isOnline={user.isOnline}/>
                                            <span>{user.name}</span>
                                            <span className="text-text-secondary">@{user.handle}</span>
                                        </div>
                                        <span className="text-xs text-text-secondary">Chat</span>
                                    </button>
                                ))}
                                </>
                           )}
                           {!query && <p className="text-center text-text-secondary p-8">Start typing to search...</p>}
                           {query && filteredResults.actions.length === 0 && filteredResults.users.length === 0 && (
                               <p className="text-center text-text-secondary p-8">No results for "{query}"</p>
                           )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;