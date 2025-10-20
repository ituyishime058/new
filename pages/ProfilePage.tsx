
import React from 'react';
import { User, Post as PostType } from '../types';
import { posts, highlights } from '../constants';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import Post from '../components/Post';
import Highlights from '../components/Highlights';

interface ProfilePageProps {
  user: User;
  onViewProfile: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onViewProfile }) => {
  const userPosts = posts.filter(p => p.author.id === user.id);

  return (
    <div className="bg-primary shadow-md rounded-xl overflow-hidden">
      <div className="h-48 bg-secondary">
        {/* Cover Photo */}
      </div>
      <div className="p-4">
        <div className="flex items-end -mt-20">
          <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
          <div className="ml-auto">
            <button className="px-4 py-2 border border-border-color rounded-full font-semibold hover:bg-secondary">Edit Profile</button>
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-text-secondary">@{user.handle}</p>
        <p className="mt-2">{user.bio}</p>
        <div className="flex space-x-4 mt-4 text-sm">
          <p><span className="font-bold">{user.following}</span> Following</p>
          <p><span className="font-bold">{user.followers}</span> Followers</p>
        </div>
      </div>
      
      <Highlights highlights={highlights} />

      <div className="border-t border-border-color p-4">
        <h2 className="text-lg font-bold">Posts</h2>
      </div>

      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} onViewProfile={onViewProfile} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
