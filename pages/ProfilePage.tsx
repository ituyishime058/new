import React, { useState } from 'react';
import { Post as PostType, User } from '../types';
import { posts as initialPosts, currentUser } from '../constants';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import Post from '../components/Post';
import Highlights from '../components/Highlights';
import FollowListModal from '../components/FollowListModal';
import EditProfileModal from '../components/EditProfileModal';

interface ProfilePageProps {
  user: User;
  onViewProfile: (user: User) => void;
  onUpdateUser: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user: initialUser, onViewProfile, onUpdateUser }) => {
  const [user, setUser] = useState(initialUser);
  const [userPosts] = useState<PostType[]>(initialPosts.filter(p => p.author.id === initialUser.id));
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const isCurrentUserProfile = user.id === currentUser.id;

  const handleSaveProfile = (updatedUser: User) => {
    setUser(updatedUser);
    onUpdateUser(updatedUser);
  };
  
  React.useEffect(() => {
      setUser(initialUser);
  }, [initialUser])

  return (
    <>
      <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-4">
                <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
                {isCurrentUserProfile ? (
                  <button onClick={() => setEditModalOpen(true)} className="px-4 py-1.5 border border-border-color rounded-md text-sm font-semibold hover:bg-secondary">
                    Edit Profile
                  </button>
                ) : (
                  <button className="px-4 py-1.5 bg-accent text-white rounded-md text-sm font-semibold hover:opacity-90">
                    Follow
                  </button>
                )}
              </div>
              <p className="text-text-secondary mt-1">@{user.handle}</p>
              <p className="text-text-primary mt-3">{user.bio}</p>

              <div className="flex justify-center sm:justify-start space-x-6 mt-4">
                <div className="text-center">
                  <span className="font-bold">{userPosts.length}</span> <span className="text-text-secondary">posts</span>
                </div>
                <button onClick={() => setFollowersModalOpen(true)} className="text-center">
                  <span className="font-bold">{user.followers || 0}</span> <span className="text-text-secondary">followers</span>
                </button>
                <button onClick={() => setFollowingModalOpen(true)} className="text-center">
                  <span className="font-bold">{user.following || 0}</span> <span className="text-text-secondary">following</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {user.highlights && user.highlights.length > 0 && <Highlights highlights={user.highlights} />}

        {/* Posts */}
        <div>
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <Post key={post.id} post={post} onViewProfile={onViewProfile} />
            ))
          ) : (
            <div className="text-center py-16 text-text-secondary">
                <Icon name="Camera" className="w-16 h-16 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold">No Posts Yet</h3>
            </div>
          )}
        </div>
      </div>
      <FollowListModal
        isOpen={isFollowersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        title="Followers"
        onViewProfile={onViewProfile}
      />
      <FollowListModal
        isOpen={isFollowingModalOpen}
        onClose={() => setFollowingModalOpen(false)}
        title="Following"
        onViewProfile={onViewProfile}
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
