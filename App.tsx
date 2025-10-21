
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import LeftSidebar from './components/LeftSidebar.tsx';
import RightSidebar from './components/RightSidebar.tsx';
import Feed from './components/Feed.tsx';
import MessagesPage from './pages/MessagesPage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import ReelsPage from './pages/ReelsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import BookmarksPage from './pages/BookmarksPage.tsx';
import LivePage from './pages/LivePage.tsx';
import BottomNav from './components/BottomNav.tsx';
import { User, Post as PostType } from './types.ts';
import { currentUser, posts as initialPosts } from './constants.ts';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings' | 'bookmarks' | 'search' | 'live';

interface ThemeSettings {
    accentHue: number;
    fontSize: 'sm' | 'base' | 'lg';
    reduceMotion: boolean;
}

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [viewingProfile, setViewingProfile] = useState<User | null>(null);
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
        accentHue: 231,
        fontSize: 'base',
        reduceMotion: false,
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-hue', themeSettings.accentHue.toString());
        document.documentElement.classList.toggle('reduce-motion', themeSettings.reduceMotion);
        document.documentElement.style.fontSize = themeSettings.fontSize === 'sm' ? '14px' : themeSettings.fontSize === 'lg' ? '18px' : '16px';
    }, [themeSettings]);


    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
        setViewingProfile(null); // Clear profile view when navigating away
    };

    const handleViewProfile = (user: User) => {
        setViewingProfile(user);
        setCurrentPage('profile');
    };

    const handleUpdatePost = (updatedPost: PostType) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    }

    const bookmarkedPosts = posts.filter(p => p.isBookmarked);

    const renderPage = () => {
        if (viewingProfile) {
            return <ProfilePage user={viewingProfile} onBack={() => setViewingProfile(null)} onViewProfile={handleViewProfile} />;
        }

        switch (currentPage) {
            case 'home':
                return <Feed onViewProfile={handleViewProfile} />;
            case 'messages':
                return <MessagesPage onViewProfile={handleViewProfile} />;
            case 'notifications':
                return <NotificationsPage />;
            case 'search':
                return <SearchPage onViewProfile={handleViewProfile} />;
            case 'profile':
                return <ProfilePage user={currentUser} onBack={() => {}} onViewProfile={handleViewProfile} />;
            case 'explore':
                return <ExplorePage />;
            case 'reels':
                return <ReelsPage />;
            case 'live':
                return <LivePage />;
            case 'settings':
                return <SettingsPage onLogout={() => console.log('logout')} settings={themeSettings} onSettingsChange={setThemeSettings} />;
            case 'bookmarks':
                return <BookmarksPage posts={bookmarkedPosts} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
            default:
                return <Feed onViewProfile={handleViewProfile} />;
        }
    };

    return (
        <div className="bg-background text-text-primary min-h-screen font-sans">
            <Header onNavigate={handleNavigate} />
            <div className="container mx-auto px-4 grid grid-cols-12 gap-8 pt-20 pb-20 md:pb-4">
                <aside className="hidden md:block md:col-span-3">
                    <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
                </aside>
                <main className="col-span-12 md:col-span-6">
                    {renderPage()}
                </main>
                <aside className="hidden lg:block lg:col-span-3">
                    <RightSidebar onViewProfile={handleViewProfile} />
                </aside>
            </div>
            <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
        </div>
    );
};

export default App;
