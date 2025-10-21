import React, { useState, useEffect, useMemo } from 'react';
import { Post as PostType, User } from '../types';
import { posts as initialPosts, currentUser } from '../constants';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import Post from '../components/Post';
import Highlights from '../components/Highlights';
import FollowListModal from '../components/FollowListModal';
import EditProfileModal from '../components/EditProfileModal';
import ProfileActivityGraph from '../components/ProfileActivityGraph';
import { motion } from 'framer-motion';

interface ProfilePageProps {
  user: User;
  onViewProfile: (user: User) => void;
  onUpdateUser: (user: User) => void;
  onFollowToggle: (userId: string) => void;
  onRemoveFollower: (userId: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user: initialUser, onViewProfile, onUpdateUser, onFollowToggle, onRemoveFollower }) => {
  const [user, setUser] = useState(initialUser);
  const [activeTab, setActiveTab] = useState('posts');
  
  const userPosts = useMemo(() => initialPosts.filter(p => p.author.id === initialUser.id), [initialUser.id]);
  const userMediaPosts = useMemo(() => userPosts.filter(p => p.imageUrl || p.videoUrl), [userPosts]);
  const userLikedPosts = useMemo(() => initialPosts.filter(p => p.isLiked), []);

  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const isCurrentUserProfile = user.id === currentUser.id;

  const handleSaveProfile = (updatedUser: User) => {
    setUser(updatedUser);
    onUpdateUser(updatedUser);
  };
  
  useEffect(() => {
      setUser(initialUser);
  }, [initialUser])

  const TabButton = ({ tabName, label, count }: { tabName: string, label: string, count: number }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-semibold rounded-t-lg relative ${activeTab === tabName ? 'text-text-primary' : 'text-text-secondary'}`}
    >
      {label} <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-full">{count}</span>
      {activeTab === tabName && (
        <motion.div layoutId="profileTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </button>
  );

  return (
    <>
      <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar src={user.avatarUrl} alt={user.name} size="lg" isOnline={user.isOnline} />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-4">
                <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
                {user.isVerified && <Icon name="CheckBadge" variant="solid" className="w-6 h-6 text-accent" />}
                {isCurrentUserProfile ? (
                  <button onClick={() => setEditModalOpen(true)} className="px-4 py-1.5 border border-border-color rounded-md text-sm font-semibold hover:bg-secondary">
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => onFollowToggle(user.id)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors w-28 ${
                      user.isFollowing 
                      ? 'bg-secondary text-text-primary border border-border-color' 
                      : 'bg-accent text-white hover:opacity-90'
                    }`}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
              <p className="text-text-secondary mt-1">@{user.handle}</p>
              <p className="text-text-primary mt-3">{user.bio}</p>

              <div className="flex justify-center sm:justify-start space-x-6 mt-4">
                <div className="text-center">
                  <span className="font-bold">{userPosts.length}</span> <span className="text-text-secondary">posts</span>
                </div>
                <button onClick={() => setFollowersModalOpen(true)} className="text-center hover:underline">
                  <span className="font-bold">{user.followers || 0}</span> <span className="text-text-secondary">followers</span>
                </button>
                <button onClick={() => setFollowingModalOpen(true)} className="text-center hover:underline">
                  <span className="font-bold">{user.following || 0}</span> <span className="text-text-secondary">following</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
             <ProfileActivityGraph />
          </div>
        </div>

        {user.highlights && user.highlights.length > 0 && <Highlights highlights={user.highlights} />}

        {/* Tabs */}
        <div className="border-b border-border-color px-4 flex space-x-4">
          <TabButton tabName="posts" label="Posts" count={userPosts.length} />
          <TabButton tabName="media" label="Media" count={userMediaPosts.length} />
          <TabButton tabName="likes" label="Likes" count={userLikedPosts.length} />
        </div>
        
        {/* Content */}
        <div>
          {activeTab === 'posts' && (
            userPosts.length > 0 ? userPosts.map(post => <Post key={post.id} post={post} onViewProfile={onViewProfile} />) : <div className="text-center py-16 text-text-secondary"><Icon name="Camera" className="w-16 h-16 mx-auto text-gray-400" /><h3 className="mt-4 text-lg font-semibold">No Posts Yet</h3></div>
          )}
          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-1 p-1">
              {userMediaPosts.map(post => (
                <div key={post.id} className="relative aspect-square group cursor-pointer">
                  <img src={post.imageUrl || ''} alt="" className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'likes' && (
            userLikedPosts.map(post => <Post key={post.id} post={post} onViewProfile={onViewProfile} />)
          )}
        </div>
      </div>
      <FollowListModal
        isOpen={isFollowersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        title="Followers"
        onViewProfile={onViewProfile}
        onRemoveFollower={onRemoveFollower}
        onFollowToggle={onFollowToggle}
      />
      <FollowListModal
        isOpen={isFollowingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        title="Following"
        onViewProfile={onViewProfile}
        onFollowToggle={onFollowToggle}
      />
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default ProfilePage;