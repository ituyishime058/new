
import React from 'react';
// FIX: Add file extension to import.
import { currentUser } from '../constants.ts';
import Avatar from './Avatar';
import Icon from './Icon';

interface HeaderProps {
    onNavigate: (page: 'home' | 'messages' | 'notifications' | 'search') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-primary/80 backdrop-blur-md border-b border-border-color z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
                    <Icon name="logo" className="h-10 w-40"/>
                </button>

                <div className="hidden md:block w-full max-w-xs lg:max-w-sm">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            onFocus={() => onNavigate('search')}
                            className="w-full bg-secondary border border-border-color rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="MagnifyingGlass" className="w-5 h-5 text-text-secondary" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button onClick={() => onNavigate('messages')} className="p-2 rounded-full hover:bg-secondary transition-colors">
                        <Icon name="ChatBubbleOvalLeftEllipsis" className="w-6 h-6" />
                    </button>
                    <button onClick={() => onNavigate('notifications')} className="p-2 rounded-full hover:bg-secondary transition-colors">
                        <Icon name="Bell" className="w-6 h-6" />
                    </button>
                    <div className="h-8 w-px bg-border-color hidden sm:block"></div>
                    <button className="flex items-center space-x-2">
                        <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="md" />
                        <span className="hidden lg:block font-semibold">{currentUser.name}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;