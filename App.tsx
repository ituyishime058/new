import React, { useState } from 'react';
import { Post, User, Notification } from './types';
import { posts as initialPosts, currentUser as initialCurrentUser } from './constants';
import Header from './components/Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import MessagesPage from './pages/MessagesPage';
import ExplorePage from './pages/ExplorePage';
import NotificationsPage from './pages/NotificationsPage';
import ReelsPage from './pages/ReelsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './BottomNav';
import AuthPage from './pages/AuthPage';
import NotificationToast from './components/NotificationToast';
import LivePage from './pages/LivePage';

type Page = 'home' | 'messages' | 'explore' | 'notifications' | 'reels' | 'profile' | 'search' | 'settings' | 'live';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentUser, setCurrentUser] = useState<User>(initialCurrentUser);
  const [profileUser, setProfileUser] = useState<User>(initialCurrentUser);
  const [notificationToast, setNotificationToast] = useState<Notification | null>(null);

  const handleNavigate = (page: Page, user?: User) => {
    if (page === 'profile' && user) {
      setProfileUser(user);
    } else if (page === 'profile' && !user) {
      setProfileUser(currentUser);
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleLoginSuccess = () => {
      setIsAuthenticated(true);
      handleNavigate('home');
  }

  const handleAddPost = (newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => {
    const postToAdd: Post = {
      ...newPost,
      id: `post-${Date.now()}`,
      author: currentUser,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    setPosts(prevPosts => [postToAdd, ...prevPosts]);
    setNotificationToast({
      id: `notif-${Date.now()}`,
      type: 'post',
      message: 'Your post was successfully published!',
      user: currentUser,
      read: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  
  const handleUpdateUser = (updatedUser: User) => {
      if(updatedUser.id === currentUser.id) {
          setCurrentUser(updatedUser);
      }
      setProfileUser(updatedUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={(user) => handleNavigate('profile', user)} onUpdatePost={handleUpdatePost} />;
      case 'messages':
        return <MessagesPage onViewProfile={(user) => handleNavigate('profile', user)} />;
      case 'explore':
        return <ExplorePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'reels':
          return <ReelsPage />;
      case 'profile':
          return <ProfilePage user={profileUser} onViewProfile={(user) => handleNavigate('profile', user)} onUpdateUser={handleUpdateUser} />;
      case 'search':
        return <SearchPage onViewProfile={(user) => handleNavigate('profile', user)} />;
      case 'settings':
        return <SettingsPage onLogout={() => setIsAuthenticated(false)} />;
      case 'live':
          return <LivePage />;
      default:
        return <Feed posts={posts} onAddPost={handleAddPost} onViewProfile={(user) => handleNavigate('profile', user)} onUpdatePost={handleUpdatePost} />;
    }
  };

  if (!isAuthenticated) {
      return <AuthPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-background text-text-primary min-h-screen">
      <Header onNavigate={(page) => setCurrentPage(page as any)} />
      <main className="container mx-auto px-4 pt-20 pb-24 md:pb-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-3">
            <LeftSidebar onNavigate={(page) => handleNavigate(page as Page)} currentPage={currentPage} />
          </div>
          <div className="col-span-12 md:col-span-6">
            {renderPage()}
          </div>
          <div className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </div>
        </div>
      </main>
      <BottomNav onNavigate={(page) => handleNavigate(page as Page)} currentPage={currentPage} />
      <NotificationToast notification={notificationToast} onClose={() => setNotificationToast(null)} />
    </div>
  );
};

export default App;
