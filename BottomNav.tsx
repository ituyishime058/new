import React from 'react';
import Icon from './components/Icon';

type Page = 'home' | 'explore' | 'reels' | 'live' | 'messages' | 'profile';

interface BottomNavProps {
    onNavigate: (page: Page) => void;
    currentPage: string;
}

interface NavItemProps {
  icon: string;
  page: Page;
  isActive: boolean;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, page, isActive, onNavigate }) => (
    <button onClick={() => onNavigate(page)} className={`flex-1 flex justify-center p-2 rounded-lg transition-colors ${isActive ? 'text-accent' : 'text-text-secondary hover:bg-secondary'}`}>
        <Icon name={icon} className="w-7 h-7" variant={isActive ? 'solid' : 'outline'} />
    </button>
)

const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, currentPage }) => {
    const navItems = [
        { icon: 'Home', page: 'home' as Page },
        { icon: 'GlobeAlt', page: 'explore' as Page },
        { icon: 'Film', page: 'reels' as Page },
        { icon: 'ChatBubbleOvalLeftEllipsis', page: 'messages' as Page },
        { icon: 'UserCircle', page: 'profile' as Page },
    ];
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-md border-t border-border-color md:hidden z-40">
            <div className="flex justify-around items-center h-16 px-2">
                 {navItems.map(item => (
                    <NavItem
                        key={item.page}
                        {...item}
                        isActive={currentPage === item.page}
                        onNavigate={onNavigate}
                    />
                ))}
                 <button 
                    onClick={() => onNavigate('live')} 
                    className={`flex-1 flex justify-center p-2 rounded-full transition-colors text-white ${currentPage === 'live' ? 'bg-accent' : 'bg-gradient-to-r from-accent-start to-accent-end'}`}
                >
                    <Icon name="CubeTransparent" className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
