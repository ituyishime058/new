import React, { useState } from 'react';
import { Post, User, Notification } from './types';
import { posts as initialPosts, currentUser as initialCurrentUser, users as initialUsers } from './constants';
import Header from './components/Header';
// FIX: Corrected component import path.
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import MessagesPage from './pages/MessagesPage';
import ExplorePage from './pages/ExplorePage';
import NotificationsPage from './pages/NotificationsPage';
import ReelsPage from './pages/ReelsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
// FIX: Corrected component import path.
import BottomNav from './components/BottomNav';
import AuthPage from './pages/AuthPage';
import NotificationToast from './components/NotificationToast';
import LivePage from './pages/LivePage';
import VaultPage from './pages/VaultPage';

type Page = 'home' | 'messages' | 'explore' | 'notifications' | 'reels' | 'profile' | 'search' | 'settings' | 'live' | 'vault';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for development
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [users, setUsers] = useState<User[]>(initialUsers);
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
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      if(updatedUser.id === currentUser.id) {
          setCurrentUser(updatedUser);
      }
      if (updatedUser.id === profileUser.id) {
        setProfileUser(updatedUser);
      }
  };

  const handleFollowToggle = (userId: string) => {
    const userToToggle = users.find(u => u.id === userId);
    if (!userToToggle) return;
    
    const wasFollowing = !!userToToggle.isFollowing;
    
    // Update the user being followed/unfollowed
    handleUpdateUser({
      ...userToToggle,
      isFollowing: !wasFollowing,
      followers: wasFollowing ? (userToToggle.followers || 1) - 1 : (userToToggle.followers || 0) + 1
    });

    // Update the current user's following count
    handleUpdateUser({
        ...currentUser,
        following: wasFollowing ? (currentUser.following || 1) - 1 : (currentUser.following || 0) + 1
    })

    setNotificationToast({
      id: `notif-${Date.now()}`,
      type: wasFollowing ? 'post' : 'follow',
      message: wasFollowing ? `Unfollowed ${userToToggle.name}` : `You are now following ${userToToggle.name}!`,
      user: userToToggle,
      read: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRemoveFollower = (followerId: string) => {
    // In a real app, this would be an API call. Here we simulate it.
    console.log(`Removing follower ${followerId}`);
    // Simulate updating the current user's followers count
     handleUpdateUser({
        ...currentUser,
        followers: (currentUser.followers || 1) - 1,
    })
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
          return <ProfilePage user={profileUser} onViewProfile={(user) => handleNavigate('profile', user)} onUpdateUser={handleUpdateUser} onFollowToggle={handleFollowToggle} onRemoveFollower={handleRemoveFollower} />;
      case 'search':
        return <SearchPage onViewProfile={(user) => handleNavigate('profile', user)} />;
      case 'settings':
        return <SettingsPage onLogout={() => setIsAuthenticated(false)} />;
      case 'live':
          return <LivePage />;
      case 'vault':
          return <VaultPage posts={posts.filter(p => p.isBookmarked)} onViewProfile={(user) => handleNavigate('profile', user)} onUpdatePost={handleUpdatePost} />;
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
            <RightSidebar users={users.filter(u => u.id !== currentUser.id)} onFollowToggle={handleFollowToggle} />
          </div>
        </div>
      </main>
      <BottomNav onNavigate={(page) => handleNavigate(page as Page)} currentPage={currentPage} />
      <NotificationToast notification={notificationToast} onClose={() => setNotificationToast(null)} />
    </div>
  );
};

export default App;