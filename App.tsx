
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import LeftSidebar from './components/LeftSidebar.tsx';
import RightSidebar from './components/RightSidebar.tsx';
import Feed from './components/Feed.tsx';
import MessagesPage from './pages/MessagesPage.tsx';
import { User, Post as PostType, Notification as NotificationType } from './types.ts';
import ProfilePage from './pages/ProfilePage.tsx';
import { currentUser, posts as initialPosts } from './constants.ts';
import BottomNav from './components/BottomNav.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import ReelsPage from './pages/ReelsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import BookmarksPage from './pages/BookmarksPage.tsx';
import LivePage from './pages/LivePage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import NotificationToast from './components/NotificationToast.tsx';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings' | 'bookmarks' | 'live' | 'search';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for demo
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [viewingProfile, setViewingProfile] = useState<User | null>(null);
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [notification, setNotification] = useState<NotificationType | null>(null);

    const [settings, setSettings] = useState({
        accentHue: 231,
        fontSize: 'base' as 'sm' | 'base' | 'lg',
        reduceMotion: false,
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-hue', settings.accentHue.toString());
        document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
        document.body.className = `text-${settings.fontSize}`;
    }, [settings]);

    const handleNavigate = (page: Page) => {
        setViewingProfile(null);
        setCurrentPage(page);
    };

    const handleViewProfile = (user: User) => {
        setViewingProfile(user);
        setCurrentPage('profile');
    };
    
    const handleUpdatePost = (updatedPost: PostType) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
        if(updatedPost.isBookmarked) {
            setNotification({
                id: `notif-${Date.now()}`,
                type: 'post',
                user: currentUser,
                timestamp: new Date().toISOString(),
                read: true,
                message: 'Post saved to bookmarks!'
            })
        }
    };
    
    if (!isAuthenticated) {
        return <AuthPage onSuccess={() => setIsAuthenticated(true)} />;
    }

    const renderPage = () => {
        if (viewingProfile) {
            return <ProfilePage user={viewingProfile} onBack={() => setViewingProfile(null)} onViewProfile={handleViewProfile}/>;
        }
        switch (currentPage) {
            case 'home':
                return <Feed onViewProfile={handleViewProfile} />;
            case 'messages':
                return <MessagesPage onViewProfile={handleViewProfile} />;
            case 'profile':
                return <ProfilePage user={currentUser} onBack={() => handleNavigate('home')} onViewProfile={handleViewProfile} />;
            case 'notifications':
                return <NotificationsPage />;
            case 'explore':
                return <ExplorePage />;
            case 'reels':
                return <ReelsPage />;
            case 'live':
                return <LivePage />;
            case 'search':
                return <SearchPage onViewProfile={handleViewProfile} />;
            case 'bookmarks':
                return <BookmarksPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'settings':
                return <SettingsPage onLogout={() => setIsAuthenticated(false)} settings={settings} onSettingsChange={setSettings} />;
            default:
                return <Feed onViewProfile={handleViewProfile}/>;
        }
    };

    return (
        <div className="bg-background text-text-primary min-h-screen">
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto pt-20 pb-20 md:pb-4 px-2 md:px-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="hidden md:block md:col-span-3">
                        <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        {renderPage()}
                    </div>
                    <div className="hidden md:block md:col-span-3">
                        <RightSidebar onViewProfile={handleViewProfile} />
                    </div>
                </div>
            </main>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
            <NotificationToast notification={notification} onClose={() => setNotification(null)} />
        </div>
    );
};

export default App;
