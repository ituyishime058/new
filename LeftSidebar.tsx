
import React from 'react';
import { currentUser } from './constants';
import Avatar from './components/Avatar';
import Icon from './components/Icon';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings';

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
        { icon: 'UserCircle', label: 'Profile', page: 'profile' as Page },
    ];

    return (
        <div className="p-2 space-y-2 sticky top-20">
            {navItems.map(item => (
                <NavItem 
                    key={item.page}
                    {...item}
                    isActive={currentPage === item.page}
                    onNavigate={onNavigate}
                />
            ))}
            <div className="pt-4">
                 <NavItem 
                    icon="Cog6Tooth"
                    label="Settings"
                    page="settings"
                    isActive={currentPage === 'settings'}
                    onNavigate={onNavigate}
                />
            </div>
        </div>
    );
};

export default LeftSidebar;
