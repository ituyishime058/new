import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
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
import BottomNav from './components/BottomNav';

import { Post, User, Conversation, Notification } from './types';
import { posts as initialPosts, currentUser } from './constants';
import AuthPage from './pages/AuthPage';
import ChatSystem from './components/ChatSystem';
import NotificationToast from './components/NotificationToast';
import CommandPalette from './components/CommandPalette';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'search' | 'settings' | 'bookmarks' | 'live';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [viewingUser, setViewingUser] = useState<User | null>(null);
    const [themeSettings, setThemeSettings] = useState({ accentHue: 231, fontSize: 'base' as 'sm'|'base'|'lg', reduceMotion: false});
    const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
    
    const [activeConversations, setActiveConversations] = useState<Conversation[]>([]);
    const [minimizedConvIds, setMinimizedConvIds] = useState<Set<string>>(new Set());
    const [focusedConvId, setFocusedConvId] = useState<string | null>(null);

    const [notification, setNotification] = useState<Notification | null>(null);

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-hue', themeSettings.accentHue.toString());
        document.body.className = `font-sans text-base antialiased bg-background text-text-primary ${themeSettings.fontSize}`;
    }, [themeSettings]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandPaletteOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleNavigate = (page: Page) => {
        setViewingUser(null);
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    
    const handleViewProfile = (user: User) => {
        setViewingUser(user);
        setCurrentPage('profile');
        window.scrollTo(0, 0);
    };

    const handleUpdatePost = (updatedPost: Post) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    };

    const handleAddPost = (newPostData: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
        const newPost: Post = {
            id: `post-${Date.now()}`,
            author: currentUser,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: [],
            ...newPostData,
        };
        setPosts([newPost, ...posts]);
        setNotification({
             id: `notif-${Date.now()}`,
             type: 'post',
             user: currentUser, // a dummy user
             read: false,
             timestamp: new Date().toISOString(),
             message: 'Your post was successfully published!',
        });
    };
    
    const handleOpenChat = (conversation: Conversation) => {
        if (currentPage === 'messages') return;

        if (!activeConversations.some(c => c.id === conversation.id)) {
             setActiveConversations(prev => [...prev.slice(-2), conversation]); // Limit to 3 active chats
        }
        
        const newMinimized = new Set(minimizedConvIds);
        newMinimized.delete(conversation.id);
        setMinimizedConvIds(newMinimized);
        
        setFocusedConvId(conversation.id);
    };
    const handleCloseChat = (id: string) => setActiveConversations(prev => prev.filter(c => c.id !== id));
    const handleMinimizeChat = (id: string) => setMinimizedConvIds(prev => new Set(prev).add(id));
    const handleRestoreChat = (conv: Conversation) => {
        const newMinimized = new Set(minimizedConvIds);
        newMinimized.delete(conv.id);
        setMinimizedConvIds(newMinimized);
        setFocusedConvId(conv.id);
    };
    const handleFocusChat = (id: string) => setFocusedConvId(id);


    const renderPage = () => {
        const pageUser = viewingUser || currentUser;

        switch (currentPage) {
            case 'home':
                return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'messages':
                return <MessagesPage onViewProfile={handleViewProfile}/>;
            case 'notifications':
                return <NotificationsPage />;
            case 'explore':
                return <ExplorePage />;
            case 'search':
                return <SearchPage onViewProfile={handleViewProfile} />;
            case 'reels':
                return <ReelsPage />;
            case 'settings':
                return <SettingsPage onLogout={() => setIsAuthenticated(false)} settings={themeSettings} onSettingsChange={setThemeSettings} />;
            case 'bookmarks':
                return <BookmarksPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            case 'live':
                return <LivePage />;
            case 'profile':
                return <ProfilePage user={pageUser} onBack={() => handleNavigate('home')} onViewProfile={handleViewProfile} />;
            default:
                return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
        }
    };

    if (!isAuthenticated) {
        return <AuthPage onSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto px-4 pt-20 pb-20 md:pb-4">
                <div className="grid grid-cols-12 gap-8">
                    <div className="hidden md:block md:col-span-3">
                       <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        {renderPage()}
                    </div>
                    <div className="hidden md:block md:col-span-3">
                       <RightSidebar onViewProfile={handleViewProfile} onOpenChat={handleOpenChat} />
                    </div>
                </div>
            </main>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
            
            <ChatSystem 
                activeConversations={activeConversations.map(conv => ({...conv, zIndex: conv.id === focusedConvId ? 50 + activeConversations.length : 50 + activeConversations.findIndex(c => c.id === conv.id)}))}
                minimizedConvIds={minimizedConvIds}
                onClose={handleCloseChat}
                onMinimize={handleMinimizeChat}
                onRestore={handleRestoreChat}
                onFocus={handleFocusChat}
                onViewProfile={handleViewProfile}
            />
            <NotificationToast notification={notification} onClose={() => setNotification(null)} />
            <CommandPalette 
                isOpen={isCommandPaletteOpen}
                onClose={() => setCommandPaletteOpen(false)}
                onNavigate={(page) => { handleNavigate(page); setCommandPaletteOpen(false); }}
                onViewProfile={(user) => { handleViewProfile(user); setCommandPaletteOpen(false); }}
                onOpenChat={(conv) => { handleOpenChat(conv); setCommandPaletteOpen(false); }}
            />
        </div>
    );
};

export default App;
