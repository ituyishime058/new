
import React, { useState } from 'react';
// FIX: Add file extension to import.
import { currentUser } from '../constants';
// FIX: Add file extension to import.
import { Post, User } from '../types';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';

interface CreatePostProps {
  onNewPost: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onNewPost }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (!postContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content: postContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };

    onNewPost(newPost);
    setPostContent('');
  };

  return (
    <div className="p-4 border-b border-border-color">
      <div className="flex space-x-4">
        <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
        <div className="w-full">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full bg-transparent text-lg placeholder-text-secondary focus:outline-none resize-none"
            placeholder="What's happening?"
            rows={2}
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-color/50">
            <div className="flex space-x-2 text-accent">
              <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="Photo" className="w-6 h-6" /></button>
              <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="ChartBar" className="w-6 h-6" /></button>
              <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="FaceSmile" className="w-6 h-6" /></button>
            </div>
            <button
              onClick={handlePost}
              disabled={!postContent.trim()}
              className="px-6 py-2 bg-accent text-white font-bold rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;