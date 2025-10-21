import React, { useState } from 'react';
import { User, Post as PostType } from '../types.ts';
import { posts, highlights as mockHighlights, currentUser } from '../constants.ts';
import Avatar from '../components/Avatar.tsx';
import Icon from '../components/Icon.tsx';
import Post from '../components/Post.tsx';
import EditProfileModal from '../components/EditProfileModal.tsx';
import FollowListModal from '../components/FollowListModal.tsx';
import Highlights from '../components/Highlights.tsx';
import ProfileActivityGraph from '../components/ProfileActivityGraph.tsx';
import { motion } from 'framer-motion';

interface ProfilePageProps {
  user: User;
  onNavigate: (page: string) => void;
  onViewProfile: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onViewProfile }) => {
    const [activeTab, setActiveTab] = useState('posts');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
    const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
    const [profileUser, setProfileUser] = useState(user);

    const userPosts = posts.filter(p => p.author.id === user.id);
    const isCurrentUserProfile = user.id === currentUser.id;

    const handleSaveProfile = (updatedUser: User) => {
        setProfileUser(updatedUser);
        // In a real app, you would also update the currentUser object in a global state
    }

    const TabButton = ({ tabName, label }: { tabName: string, label: string }) => (
        <button
          onClick={() => setActiveTab(tabName)}
          className={`flex-1 py-3 text-center font-semibold relative ${activeTab === tabName ? 'text-text-primary' : 'text-text-secondary'}`}
        >
          {label}
          {activeTab === tabName && (
            <motion.div layoutId="profileTabIndicator" className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full" />
          )}
        </button>
      );
      

  return (
    <>
    <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        <div className="h-48 bg-secondary relative">
            <img src="/covers/profile-cover.jpg" alt="Profile cover" className="w-full h-full object-cover" />
            <div className="absolute -bottom-12 left-6">
                <div className="bg-primary p-1 rounded-full">
                    <Avatar src={profileUser.avatarUrl} alt={profileUser.name} size="lg" isOnline={profileUser.isOnline} />
                </div>
            </div>
        </div>

        <div className="p-6 pt-16">
            <div className="flex justify-end">
                {isCurrentUserProfile ? (
                    <button onClick={() => setEditModalOpen(true)} className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary transition-colors">
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex space-x-2">
                         <button className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary transition-colors">
                            <Icon name="Bell" className="w-5 h-5"/>
                        </button>
                        <button onClick={() => onNavigate('messages')} className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary transition-colors">
                            Message
                        </button>
                        <button className="px-4 py-2 bg-accent text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
                            Follow
                        </button>
                    </div>
                )}
            </div>
            
            <h1 className="text-2xl font-bold mt-2">{profileUser.name}</h1>
            <p className="text-text-secondary">@{profileUser.handle}</p>
            <p className="mt-3 text-text-primary">{profileUser.bio}</p>
            
            <div className="flex space-x-6 mt-4 text-text-secondary">
                <button onClick={() => setFollowersModalOpen(true)} className="hover:underline">
                    <span className="font-bold text-text-primary">{profileUser.followers}</span> Followers
                </button>
                 <button onClick={() => setFollowingModalOpen(true)} className="hover:underline">
                    <span className="font-bold text-text-primary">{profileUser.following}</span> Following
                </button>
            </div>
        </div>

        {isCurrentUserProfile && <Highlights highlights={mockHighlights} />}
        
        <div className="border-t border-border-color flex">
            <TabButton tabName="posts" label="Posts" />
            <TabButton tabName="replies" label="Replies" />
            <TabButton tabName="media" label="Media" />
            <TabButton tabName="activity" label="Activity" />
        </div>
        
        <div>
            {activeTab === 'posts' && userPosts.map(post => (
                <Post key={post.id} post={post} onViewProfile={onViewProfile} />
            ))}
            {activeTab !== 'posts' && activeTab !== 'activity' && (
                <div className="p-8 text-center text-text-secondary">
                    <p>Content for "{activeTab}" will be here.</p>
                </div>
            )}
             {activeTab === 'activity' && (
                <div className="p-4">
                    <ProfileActivityGraph />
                </div>
            )}
        </div>
    </div>
    <EditProfileModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} user={profileUser} onSave={handleSaveProfile} />
    <FollowListModal isOpen={isFollowersModalOpen} onClose={() => setFollowersModalOpen(false)} title="Followers" onViewProfile={onViewProfile} />
    <FollowListModal isOpen={isFollowingModalOpen} onClose={() => setFollowingModalOpen(false)} title="Following" onViewProfile={onViewProfile} />
    </>
  );
};

export default ProfilePage;
