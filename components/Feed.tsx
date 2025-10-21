import React from 'react';
import { Post as PostType, User } from '../types.ts';
import CreatePost from './CreatePost.tsx';
import Post from './Post.tsx';
import Stories from './Stories.tsx';

interface FeedProps {
  posts: PostType[];
  onNewPost: (post: PostType) => void;
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onNewPost, onViewProfile, onUpdatePost }) => {
  return (
    <div className="space-y-4">
      <div className="bg-primary shadow-md rounded-xl">
        <Stories />
        <CreatePost onNewPost={onNewPost} />
      </div>
      {posts.map(post => (
        <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={onUpdatePost} />
      ))}
    </div>
  );
};

export default Feed;
