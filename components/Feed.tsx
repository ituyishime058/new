
import React from 'react';
import { Post as PostType, User } from '../types';
import CreatePost from './CreatePost';
import Post from './Post';
import Stories from './Stories';

interface FeedProps {
  posts: PostType[];
  onAddPost: (newPost: Omit<PostType, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => void;
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onAddPost, onViewProfile, onUpdatePost }) => {
  return (
    <div>
      <Stories />
      <CreatePost onAddPost={onAddPost} />
      <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        {posts.map(post => (
          <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={onUpdatePost} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
