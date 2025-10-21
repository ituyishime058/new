
import React, { useState } from 'react';
// FIX: Add file extension to import.
import { posts } from '../constants';
import Icon from '../components/Icon';
import ImageModal from '../components/ImageModal';
import AiImageGenerator from '../components/AiImageGenerator';

const ExplorePage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [tab, setTab] = useState('explore');

    return (
        <>
            <div className="bg-primary shadow-md rounded-xl p-4">
                <div className="flex border-b border-border-color mb-4">
                    <button 
                        onClick={() => setTab('explore')}
                        className={`px-4 py-2 font-semibold ${tab === 'explore' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary'}`}
                    >
                        Explore
                    </button>
                    <button 
                        onClick={() => setTab('generate')}
                        className={`px-4 py-2 font-semibold flex items-center space-x-2 ${tab === 'generate' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary'}`}
                    >
                        <Icon name="Sparkles" className="w-5 h-5"/>
                        <span>Generate</span>
                    </button>
                </div>

                {tab === 'explore' && (
                    <div className="grid grid-cols-3 gap-1 animate-fade-in">
                        {posts.filter(p => p.imageUrl).map((post) => (
                            <div key={post.id} className="relative aspect-square group cursor-pointer" onClick={() => setSelectedImage(post.imageUrl!)}>
                                <img src={post.imageUrl} alt="Explore content" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center space-x-1">
                                            <Icon name="Heart" variant="solid" className="w-5 h-5" /> 
                                            <span>{post.likes}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Icon name="ChatBubbleOvalLeft" variant="solid" className="w-5 h-5" /> 
                                            <span>{post.comments.length}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {tab === 'generate' && (
                    <div className="animate-fade-in">
                        <AiImageGenerator />
                    </div>
                )}
            </div>
            <ImageModal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} imageUrl={selectedImage || ''} />
        </>
    );
};

export default ExplorePage;