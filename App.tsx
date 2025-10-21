
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import LeftSidebar from './components/LeftSidebar.tsx';
import RightSidebar from './components/RightSidebar.tsx';
import BottomNav from './components/BottomNav.tsx';
import Feed from './components/Feed.tsx';
// FIX: Add file extension to import.
import MessagesPage from './pages/MessagesPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import ReelsPage from './pages/ReelsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import BookmarksPage from './pages/BookmarksPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import LivePage from './pages/LivePage.tsx';
import CommandPalette from './components/CommandPalette.tsx';
import NotificationToast from './components/NotificationToast.tsx';
// FIX: Add file extension to import.
import { User, Post, Notification, Conversation } from './types.ts';
// FIX: Add file extension to import.
import { currentUser, posts as initialPosts } from './constants.ts';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>(posts.filter(p => p.isBookmarked));

    const handleNavigate = (page: string, user?: User) => {
        if (page === 'profile' && user) {
            setProfileUser(user);
        } else if (page === 'profile' && !user) {
            setProfileUser(currentUser);
        } else {
            setProfileUser(null);
        }
        setCurrentPage(page);
    };
    
    const handleViewProfile = (user: User) => {
        handleNavigate('profile', user);
    };
    
    const handleNewPost = (post: Post) => {
        setPosts(prev => [post, ...prev]);
        setNotification({
            id: `notif-${Date.now()}`,
            type: 'post',
            user: currentUser,
            timestamp: new Date().toISOString(),
            read: false,
            message: "Your post was successfully published!"
        });
    };
    
    const handleUpdatePost = (updatedPost: Post) => {
        setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
        
        // Update bookmarks if the post is bookmarked
        if (updatedPost.isBookmarked) {
            if (!bookmarkedPosts.find(p => p.id === updatedPost.id)) {
                 setBookmarkedPosts(prev => [updatedPost, ...prev]);
            }
        } else {
            setBookmarkedPosts(prev => prev.filter(p => p.id !== updatedPost.id));
        }
    };
    
    const handleOpenChat = (conversation: Conversation) => {
        // This would be more complex in a real app, but for now just navigate
        setCurrentPage('messages');
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setCommandPaletteOpen(prev => !prev);
            }
            if (event.key === 'Escape') {
                setCommandPaletteOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const renderContent = () => {
        if (profileUser) {
            return <ProfilePage user={profileUser} onNavigate={handleNavigate} onViewProfile={handleViewProfile} />;
        }
        switch (currentPage) {
            case 'home': return <Feed posts={posts} onNewPost={handleNewPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost}/>;
            case 'messages': return <MessagesPage onViewProfile={handleViewProfile} />;
            case 'explore': return <ExplorePage />;
            case 'notifications': return <NotificationsPage />;
            case 'reels': return <ReelsPage />;
            case 'bookmarks': return <BookmarksPage posts={bookmarkedPosts} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'settings': return <SettingsPage />;
            case 'search': return <SearchPage onViewProfile={handleViewProfile} />;
            case 'live': return <LivePage />;
            default: return <Feed posts={posts} onNewPost={handleNewPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
        }
    };

    return (
        <div className="bg-background text-text-primary min-h-screen">
            <Header onNavigate={handleNavigate} onSearchClick={() => setCurrentPage('search')} />
            <main className="container mx-auto px-4 grid grid-cols-12 gap-8 pt-20 pb-24 md:pb-8">
                <aside className="hidden md:block md:col-span-3">
                    <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                </aside>
                <div className="col-span-12 md:col-span-6">
                    {renderContent()}
                </div>
                <aside className="hidden md:block md:col-span-3 sticky top-20 h-[calc(100vh-6rem)]">
                     <RightSidebar onViewProfile={handleViewProfile}/>
                </aside>
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
             <NotificationToast notification={notification} onClose={() => setNotification(null)} />
        </div>
    );
};

export default App;