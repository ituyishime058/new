
import React, { useState } from 'react';
import { posts as initialPosts } from '../constants.ts';
import { Post as PostType, User } from '../types.ts';
import CreatePost from './CreatePost.tsx';
import Post from './Post.tsx';
import Stories from './Stories.tsx';

interface FeedProps {
    onViewProfile: (user: User) => void;
}

const Feed: React.FC<FeedProps> = ({ onViewProfile }) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);

  const handleNewPost = (post: PostType) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const handleUpdatePost = (updatedPost: PostType) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  }

  return (
    <div className="bg-primary shadow-md rounded-xl">
      <Stories />
      <CreatePost onNewPost={handleNewPost} />
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={handleUpdatePost} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
