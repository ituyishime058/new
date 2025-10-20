
import React, { useState } from 'react';
import { posts } from '../constants';
import Icon from '../components/Icon';
import ImageModal from '../components/ImageModal';

const ExplorePage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <div className="grid grid-cols-3 gap-1">
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
            <ImageModal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} imageUrl={selectedImage || ''} />
        </>
    );
};

export default ExplorePage;
