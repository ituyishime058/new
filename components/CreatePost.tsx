
import React, { useState } from 'react';
// FIX: Corrected import path for constants
import { currentUser } from '../constants';
// FIX: Corrected import path for types
import { Post } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';

interface CreatePostProps {
  onAddPost: (newPost: Omit<Post, 'id' | 'author' | 'timestamp' | 'likes' | 'comments'>) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    onAddPost({ content: postContent });
    setPostContent('');
  };

  return (
    <div className="bg-primary p-4 rounded-xl shadow-md mb-8">
      <div className="flex items-start space-x-3">
        <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
            className="w-full bg-secondary border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            rows={2}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-2 text-text-secondary">
              <button type="button" className="p-2 rounded-full hover:bg-secondary"><Icon name="Photo" className="w-6 h-6" /></button>
              <button type="button" className="p-2 rounded-full hover:bg-secondary"><Icon name="VideoCamera" className="w-6 h-6" /></button>
              <button type="button" className="p-2 rounded-full hover:bg-secondary"><Icon name="ChartBar" className="w-6 h-6" /></button>
              <button type="button" className="p-2 rounded-full hover:bg-secondary"><Icon name="MapPin" className="w-6 h-6" /></button>
            </div>
            <button type="submit" disabled={!postContent.trim()} className="bg-accent text-white px-6 py-2 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
