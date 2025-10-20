
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import BottomNav from './components/BottomNav';
import Feed from './components/Feed';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ExplorePage from './pages/ExplorePage';
import ReelsPage from './pages/ReelsPage';
import SearchPage from './pages/SearchPage';
import LivePage from './pages/LivePage';
import NotificationToast from './components/NotificationToast';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { posts as initialPosts, currentUser } from './constants';
import type { Post, User, Notification } from './types';

type Page = 'home' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings' | 'search' | 'live' | 'landing' | 'auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [profileUser, setProfileUser] = useState<User>(currentUser);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Check for a saved auth state to persist login
    const savedAuth = localStorage.getItem('nexus-auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setCurrentPage('home');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
    localStorage.setItem('nexus-auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    localStorage.removeItem('nexus-auth');
  };

  const handleNavigate = (page: Page) => {
    if (page === 'profile') {
      setProfileUser(currentUser);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleViewProfile = (user: User) => {
    setProfileUser(user);
    setCurrentPage('profile');
    window.scrollTo(0, 0);
  };

  const handleAddPost = (newPostData: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      author: currentUser,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      reactions: {},
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    setNotification({
        id: `notif-${Date.now()}`,
        type: 'post',
        user: currentUser,
        read: false,
        timestamp: new Date().toISOString(),
        message: 'Your post was successfully created!'
    });
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  
  if (!isAuthenticated) {
      if (currentPage === 'auth') {
          return <AuthPage onLogin={handleLogin} onNavigateToLanding={() => setCurrentPage('landing')} />;
      }
      return <LandingPage onNavigateToAuth={() => setCurrentPage('auth')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={updatePost} />;
      case 'messages':
        return <MessagesPage onViewProfile={handleViewProfile} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage user={profileUser} onViewProfile={handleViewProfile} onLogout={handleLogout}/>;
      case 'settings':
        return <SettingsPage onLogout={handleLogout}/>;
      case 'explore':
        return <ExplorePage />;
      case 'reels':
        return <ReelsPage />;
      case 'search':
          return <SearchPage onViewProfile={handleViewProfile} />;
      case 'live':
          return <LivePage />;
      default:
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={handleViewProfile} onUpdatePost={updatePost} />;
    }
  };

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <Header onNavigate={handleNavigate} />
      <NotificationToast notification={notification} onClose={() => setNotification(null)} />
      <main className="container mx-auto px-4 grid grid-cols-12 gap-8 pt-20 pb-20 md:pb-8">
        <aside className="hidden md:block md:col-span-3">
          <LeftSidebar onNavigate={handleNavigate} currentPage={currentPage} />
        </aside>
        <div className="col-span-12 md:col-span-9 lg:col-span-6">
          {renderPage()}
        </div>
        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar onViewProfile={handleViewProfile}/>
        </aside>
      </main>
      <BottomNav onNavigate={handleNavigate} currentPage={currentPage} />
    </div>
  );
};

export default App;
