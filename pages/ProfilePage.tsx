
import React, { useState } from 'react';
import { User } from '../types';
import { posts, highlights } from '../constants';
import Avatar from '../components/Avatar';
import Post from '../components/Post';
import Highlights from '../components/Highlights';
import EditProfileModal from '../components/EditProfileModal';
import FollowListModal from '../components/FollowListModal';

interface ProfilePageProps {
  user: User;
  onViewProfile: (user: User) => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onViewProfile, onLogout }) => {
  const [userPosts, setUserPosts] = useState(posts.filter(p => p.author.id === user.id));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const handleUpdatePost = (updatedPost: any) => {
    setUserPosts(prevPosts => prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  
  const handleProfileUpdate = (updatedUser: User) => {
    // In a real app, this would update a global user state.
    // For now, we just log it.
    console.log("Profile updated:", updatedUser);
  };

  return (
    <>
      <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        <div className="h-48 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop)'}}>
          {/* Cover Photo */}
        </div>
        <div className="p-4">
          <div className="flex items-end -mt-20">
            <div className="w-32 h-32 rounded-full border-4 border-primary bg-primary">
                <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
            </div>
            <div className="ml-auto flex space-x-2">
              <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary">Edit Profile</button>
              <button onClick={onLogout} className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary">Logout</button>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-text-secondary">@{user.handle}</p>
          <p className="mt-2">{user.bio}</p>
          <div className="flex space-x-4 mt-4 text-sm">
            <button onClick={() => setIsFollowingModalOpen(true)} className="hover:underline"><span className="font-bold">{user.following}</span> Following</button>
            <button onClick={() => setIsFollowersModalOpen(true)} className="hover:underline"><span className="font-bold">{user.followers}</span> Followers</button>
          </div>
        </div>
        
        <Highlights highlights={highlights} />

        <div className="border-t border-border-color p-4">
          <h2 className="text-lg font-bold">Posts</h2>
        </div>

        <div>
          {userPosts.map(post => (
            <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={handleUpdatePost} />
          ))}
        </div>
      </div>
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} onSave={handleProfileUpdate} />
      <FollowListModal isOpen={isFollowersModalOpen} onClose={() => setIsFollowersModalOpen(false)} title="Followers" onViewProfile={onViewProfile} />
      <FollowListModal isOpen={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} title="Following" onViewProfile={onViewProfile} />
    </>
  );
};

export default ProfilePage;
