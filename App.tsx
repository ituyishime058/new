
import React, { useState, useEffect } from 'react';
import { User, Post as PostType, Notification as NotificationType, Conversation } from './types';
import { currentUser, posts as initialPosts } from './constants';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import BottomNav from './components/BottomNav';
import Feed from './components/Feed';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ExplorePage from './pages/ExplorePage';
import SearchPage from './pages/SearchPage';
import ReelsPage from './pages/ReelsPage';
import SettingsPage from './pages/SettingsPage';
import BookmarksPage from './pages/BookmarksPage';
import LivePage from './pages/LivePage';
import AuthPage from './pages/AuthPage';
import VaultPage from './pages/VaultPage';
import NotificationToast from './components/NotificationToast';
import CommandPalette from './components/CommandPalette';

type Page = 'home' | 'messages' | 'notifications' | 'explore' | 'search' | 'reels' | 'profile' | 'settings' | 'bookmarks' | 'live' | 'vault';

interface ThemeSettings {
    accentHue: number;
    fontSize: 'sm' | 'base' | 'lg';
    reduceMotion: boolean;
}

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [profileUser, setProfileUser] = useState<User>(currentUser);
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [notification, setNotification] = useState<NotificationType | null>(null);
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    
    const [settings, setSettings] = useState<ThemeSettings>({
        accentHue: 231,
        fontSize: 'base',
        reduceMotion: false,
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-hue', settings.accentHue.toString());
        document.body.className = `text-${settings.fontSize}`;
        if (settings.reduceMotion) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }
    }, [settings]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandPaletteOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setCommandPaletteOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        if (page === 'profile') {
            setProfileUser(currentUser);
        }
        window.scrollTo(0, 0);
    };

    const handleViewProfile = (user: User) => {
        setProfileUser(user);
        setCurrentPage('profile');
        window.scrollTo(0, 0);
    };

    const handleAddPost = (newPost: Omit<PostType, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
        const postToAdd: PostType = {
            ...newPost,
            id: `post-${Date.now()}`,
            author: currentUser,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: [],
        };
        setPosts([postToAdd, ...posts]);
        setNotification({
            id: `notif-${Date.now()}`,
            type: 'post',
            user: currentUser, // Not used but required
            timestamp: new Date().toISOString(),
            read: false,
            message: 'Your post was successfully published!'
        });
    };
    
    const handleUpdatePost = (updatedPost: PostType) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    };

    const handleOpenChat = (conversation: Conversation) => {
        // This would require more state management to pass the selected conversation
        // to the MessagesPage. For now, just navigate.
        setCurrentPage('messages');
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'messages':
                return <MessagesPage onViewProfile={handleViewProfile} />;
            case 'profile':
                return <ProfilePage user={profileUser} onBack={() => setCurrentPage('home')} onViewProfile={handleViewProfile} />;
            case 'notifications':
                return <NotificationsPage />;
            case 'explore':
                return <ExplorePage />;
            case 'search':
                return <SearchPage onViewProfile={handleViewProfile} />;
            case 'reels':
                return <ReelsPage />;
            case 'live':
                return <LivePage />;
            case 'settings':
                return <SettingsPage onLogout={() => setIsAuthenticated(false)} settings={settings} onSettingsChange={setSettings}/>;
            case 'bookmarks':
                return <BookmarksPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'vault':
                return <VaultPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            default:
                return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
        }
    };
    
    if (!isAuthenticated) {
        return <AuthPage onSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="bg-background min-h-screen text-text-primary">
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto px-2 sm:px-4 pt-20 pb-20 md:pb-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="hidden md:block md:col-span-3">
                        <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                    </div>
                    <div className="col-span-12 md:col-span-9 lg:col-span-6">
                        {renderPage()}
                    </div>
                    <div className="hidden lg:block lg:col-span-3">
                        <RightSidebar onViewProfile={handleViewProfile} />
                    </div>
                </div>
            </main>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
            <NotificationToast notification={notification} onClose={() => setNotification(null)} />
            <CommandPalette 
                isOpen={isCommandPaletteOpen} 
                onClose={() => setCommandPaletteOpen(false)}
                onNavigate={(page) => { handleNavigate(page as Page); setCommandPaletteOpen(false); }}
                onViewProfile={(user) => { handleViewProfile(user); setCommandPaletteOpen(false); }}
                onOpenChat={(convo) => { handleOpenChat(convo); setCommandPaletteOpen(false); }}
            />
        </div>
    );
};

export default App;
