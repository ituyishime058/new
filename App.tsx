import React, { useState, useEffect } from 'react';
import { User, Post as PostType, Conversation, Notification as NotificationType } from './types.ts';
import { currentUser, posts as initialPosts } from './constants.ts';
import Header from './components/Header.tsx';
import LeftSidebar from './components/LeftSidebar.tsx';
import RightSidebar from './components/RightSidebar.tsx';
import Feed from './components/Feed.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import MessagesPage from './pages/MessagesPage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import ReelsPage from './pages/ReelsPage.tsx';
import LivePage from './pages/LivePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import BookmarksPage from './pages/BookmarksPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import BottomNav from './components/BottomNav.tsx';
import CommandPalette from './components/CommandPalette.tsx';
import NotificationToast from './components/NotificationToast.tsx';

type Page = 'home' | 'explore' | 'reels' | 'live' | 'messages' | 'notifications' | 'profile' | 'settings' | 'bookmarks' | 'search';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [viewedProfile, setViewedProfile] = useState<User | null>(null);
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [toastNotification, setToastNotification] = useState<NotificationType | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandPaletteOpen(isOpen => !isOpen);
            }
            if (e.key === 'Escape') {
                setCommandPaletteOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    // Simulate a notification
    useEffect(() => {
        const timer = setTimeout(() => {
            setToastNotification({
                id: 'toast-1',
                type: 'post',
                user: currentUser,
                timestamp: new Date().toISOString(),
                read: false,
                message: 'Your post was successfully published!',
            });
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setViewedProfile(null); // Reset profile view on navigation
        window.scrollTo(0, 0);
    };

    const handleViewProfile = (user: User) => {
        setViewedProfile(user);
        setCurrentPage('profile');
        window.scrollTo(0, 0);
    };
    
    const handleOpenChat = (conversation: Conversation) => {
        // This would be more complex in a real app, maybe updating a global state
        // For now, just navigate to messages
        handleNavigate('messages');
    }

    const handleUpdatePost = (updatedPost: PostType) => {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    }
    
    const renderPage = () => {
        const targetProfile = viewedProfile || currentUser;
        switch (currentPage) {
            case 'home':
                return <Feed onViewProfile={handleViewProfile} />;
            case 'profile':
                return <ProfilePage user={targetProfile} onNavigate={handleNavigate} onViewProfile={onViewProfile} />;
            case 'messages':
                return <MessagesPage onViewProfile={handleViewProfile} />;
            case 'explore':
                return <ExplorePage />;
            case 'notifications':
                return <NotificationsPage />;
            case 'reels':
                return <ReelsPage />;
            case 'live':
                return <LivePage />;
            case 'settings':
                return <SettingsPage />;
            case 'bookmarks':
                const bookmarkedPosts = posts.filter(p => p.isBookmarked);
                return <BookmarksPage posts={bookmarkedPosts} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'search':
                return <SearchPage onViewProfile={handleViewProfile} />;
            default:
                return <Feed onViewProfile={handleViewProfile} />;
        }
    };

    return (
        <div className="bg-background text-text-primary min-h-screen">
            <Header onNavigate={handleNavigate} onSearchClick={() => setCommandPaletteOpen(true)} />
            <main className="container mx-auto px-4 py-20 md:py-24 grid grid-cols-12 gap-8">
                <div className="hidden md:block md:col-span-3">
                    <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    {renderPage()}
                </div>
                <div className="hidden md:block md:col-span-3">
                    <RightSidebar onViewProfile={handleViewProfile} />
                </div>
            </main>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
            <CommandPalette 
                isOpen={isCommandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
                onNavigate={(page) => {
                    handleNavigate(page);
                    setCommandPaletteOpen(false);
                }}
                onViewProfile={(user) => {
                    handleViewProfile(user);
                    setCommandPaletteOpen(false);
                }}
                onOpenChat={(conv) => {
                    handleOpenChat(conv);
                    setCommandPaletteOpen(false);
                }}
            />
             <NotificationToast notification={toastNotification} onClose={() => setToastNotification(null)} />
        </div>
    );
};

export default App;
