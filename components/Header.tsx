import React from 'react';
import { currentUser } from '../constants.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';

type Page = 'home' | 'messages' | 'notifications' | 'search';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onSearchClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-primary/80 backdrop-blur-md border-b border-border-color z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
                <button onClick={() => onNavigate('home')}>
                    <Icon name="logo" className="h-10 w-auto" />
                </button>
            </div>

            {/* Center (Search for larger screens) */}
            <div className="hidden md:flex flex-1 justify-center px-8">
                 <button 
                    onClick={onSearchClick}
                    className="w-full max-w-md bg-secondary text-text-secondary px-4 py-2 rounded-full flex items-center space-x-3 hover:bg-border-color transition-colors"
                >
                    <Icon name="MagnifyingGlass" className="w-5 h-5" />
                    <span>Search...</span>
                    <span className="ml-auto text-xs bg-background px-1.5 py-0.5 rounded-md border border-border-color">⌘K</span>
                </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
                <button onClick={onSearchClick} className="md:hidden p-2 rounded-full hover:bg-secondary">
                    <Icon name="MagnifyingGlass" className="w-6 h-6 text-text-secondary" />
                </button>
                 <button onClick={() => onNavigate('messages')} className="p-2 rounded-full hover:bg-secondary relative">
                    <Icon name="ChatBubbleOvalLeftEllipsis" className="w-6 h-6 text-text-secondary" />
                    <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary"></span>
                </button>
                 <button onClick={() => onNavigate('notifications')} className="p-2 rounded-full hover:bg-secondary relative">
                    <Icon name="Bell" className="w-6 h-6 text-text-secondary" />
                    <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary"></span>
                </button>
                <div className="w-px h-8 bg-border-color mx-2"></div>
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-secondary">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm"/>
                </button>
            </div>
        </div>
    </header>
  );
};

export default Header;
