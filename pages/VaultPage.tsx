
import React, { useState } from 'react';
import Icon from '../components/Icon';
// FIX: Add file extension to import.
import { Post as PostType, User } from '../types.ts';
import Post from '../components/Post.tsx';
import { motion } from 'framer-motion';

interface VaultPageProps {
  posts: PostType[];
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const VaultPage: React.FC<VaultPageProps> = ({ posts, onViewProfile, onUpdatePost }) => {
    const [activeTab, setActiveTab] = useState('posts');

    const TabButton = ({ tabName, label, icon }: { tabName: string, label: string, icon: string }) => (
        <button
          onClick={() => setActiveTab(tabName)}
          className={`px-4 py-2 font-semibold flex items-center space-x-2 relative ${activeTab === tabName ? 'text-accent' : 'text-text-secondary'}`}
        >
          <Icon name={icon} className="w-5 h-5" />
          <span>{label}</span>
          {activeTab === tabName && (
            <motion.div layoutId="vaultTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
      );
      
  return (
    <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        <header className="p-4 border-b border-border-color flex items-center space-x-3">
            <Icon name="ArchiveBox" className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold text-text-primary">My Vault</h1>
        </header>
        
        <div className="border-b border-border-color flex">
            <TabButton tabName="posts" label="Saved Posts" icon="Bookmark" />
            <TabButton tabName="ai" label="AI Creations" icon="Sparkles" />
        </div>

        <div className="space-y-4">
            {activeTab === 'posts' && (
                posts.length > 0 ? (
                    posts.map(post => (
                        <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={onUpdatePost} />
                    ))
                ) : (
                    <div className="text-center py-16 text-text-secondary">
                        <Icon name="BookmarkSlash" className="w-16 h-16 mx-auto text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold">No Saved Posts</h3>
                        <p className="mt-1">Posts you save will appear here.</p>
                    </div>
                )
            )}
             {activeTab === 'ai' && (
                <div className="text-center py-16 text-text-secondary">
                    <Icon name="Sparkles" className="w-16 h-16 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">No AI Creations Yet</h3>
                    <p className="mt-1">Images you generate with AI will be saved here.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default VaultPage;