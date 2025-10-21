
import React, { useState, useEffect } from 'react';
import { Post, User, Notification as NotificationType } from './types';
import { posts as initialPosts, currentUser } from './constants';
// FIX: Corrected import paths for components and pages
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ExplorePage from './pages/ExplorePage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import BottomNav from './components/BottomNav';
import AuthPage from './pages/AuthPage';
import NotificationToast from './components/NotificationToast';
import ReelsPage from './pages/ReelsPage';
import BookmarksPage from './pages/BookmarksPage';
import LivePage from './pages/LivePage';

type Page = 'home' | 'profile' | 'messages' | 'notifications' | 'explore' | 'settings' | 'search' | 'reels' | 'bookmarks' | 'live';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<NotificationType | null>(null);

  const handleAuthSuccess = () => {
      setIsAuthenticated(true);
      setCurrentPage('home');
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
  };
  
  const handleNavigate = (page: Page) => {
    setViewedUser(null); // Reset viewed user on navigation
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleViewProfile = (user: User) => {
    setViewedUser(user);
    setCurrentPage('profile');
    window.scrollTo(0, 0);
  };

  const handleAddPost = (newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
    const postToAdd: Post = {
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
        user: currentUser,
        message: 'Your post was successfully published!',
        read: false,
        timestamp: new Date().toISOString(),
    })
  };

  const handleUpdatePost = (updatedPost: Post) => {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
      case 'profile':
        return <ProfilePage user={viewedUser || currentUser} onBack={() => handleNavigate('home')} onViewProfile={handleViewProfile} />;
      case 'messages':
        return <MessagesPage onViewProfile={handleViewProfile} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'explore':
        return <ExplorePage />;
      case 'settings':
        return <SettingsPage onLogout={handleLogout} />;
      case 'search':
        return <SearchPage onViewProfile={handleViewProfile} />;
      case 'reels':
          return <ReelsPage />;
      case 'bookmarks':
          return <BookmarksPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
      case 'live':
          return <LivePage />;
      default:
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={handleUpdatePost} />;
    }
  };
  
  if (!isAuthenticated) {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-2 sm:px-4 pt-20 pb-20 md:pb-4 grid grid-cols-12 gap-4">
        <aside className="hidden md:block md:col-span-3">
          {/* FIX: Use component from components directory */}
          <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
        </aside>
        <div className="col-span-12 md:col-span-9 lg:col-span-6">
          {renderPage()}
        </div>
        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar onViewProfile={handleViewProfile} />
        </aside>
      </main>
      {/* FIX: Use component from components directory */}
      <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
      <NotificationToast notification={notification} onClose={() => setNotification(null)} />
    </div>
  );
};

export default App;
