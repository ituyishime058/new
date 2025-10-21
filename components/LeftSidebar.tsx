import React from 'react';
// FIX: Corrected import path for constants
import { currentUser } from '../constants';
// FIX: Corrected import path for components
import Avatar from './Avatar';
import Icon from './Icon';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings' | 'bookmarks';

interface LeftSidebarProps {
  onNavigate: (page: Page) => void;
  currentPage: string;
}

interface NavItemProps {
  icon: string;
  label: string;
  page: Page;
  isActive: boolean;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, isActive, onNavigate }) => (
    <button 
        onClick={() => onNavigate(page)} 
        className={`w-full flex items-center space-x-4 px-3 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-secondary font-bold text-text-primary' : 'hover:bg-secondary text-text-secondary'
        }`}
    >
        <Icon name={icon} className="w-7 h-7" variant={isActive ? 'solid' : 'outline'} />
        <span className="text-lg">{label}</span>
    </button>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ onNavigate, currentPage }) => {
    const navItems = [
        { icon: 'Home', label: 'Home', page: 'home' as Page },
        { icon: 'GlobeAlt', label: 'Explore', page: 'explore' as Page },
        { icon: 'Film', label: 'Reels', page: 'reels' as Page },
        { icon: 'ChatBubbleOvalLeftEllipsis', label: 'Messages', page: 'messages' as Page },
        { icon: 'Bell', label: 'Notifications', page: 'notifications' as Page },
        { icon: 'Bookmark', label: 'Bookmarks', page: 'bookmarks' as Page},
        { icon: 'UserCircle', label: 'Profile', page: 'profile' as Page },
    ];

    return (
        <div className="p-2 flex flex-col space-y-2 sticky top-20 h-[calc(100vh-6rem)]">
            {navItems.map(item => (
                <NavItem 
                    key={item.page}
                    {...item}
                    isActive={currentPage === item.page}
                    onNavigate={onNavigate}
                />
            ))}
            <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-accent-start to-accent-end text-white font-bold text-lg py-3 rounded-full hover:opacity-90 transition-opacity">
                    Create Post
                </button>
            </div>
            <div className="mt-auto pb-4">
                <NavItem 
                    icon="Cog6Tooth"
                    label="Settings"
                    page="settings"
                    isActive={currentPage === 'settings'}
                    onNavigate={onNavigate}
                />
                <button onClick={() => onNavigate('profile')} className="w-full flex items-center space-x-3 p-2 mt-2 rounded-lg hover:bg-secondary">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="md" />
                    <div>
                        <p className="font-bold text-text-primary">{currentUser.name}</p>
                        <p className="text-sm text-text-secondary">@{currentUser.handle}</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LeftSidebar;
