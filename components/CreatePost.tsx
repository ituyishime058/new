import React, { useState, useRef } from 'react';
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
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !image) return;

        onAddPost({
            content,
            imageUrl: previewUrl || undefined,
        });

        setContent('');
        handleRemoveImage();
    };

    return (
        <div className="bg-primary p-4 rounded-xl shadow-md mb-8">
            <div className="flex space-x-4">
                <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
                <div className="w-full">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
                        className="w-full bg-secondary border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none text-lg"
                        rows={3}
                    />
                    {previewUrl && (
                         <div className="mt-2 relative">
                             <img src={previewUrl} alt="Preview" className="rounded-lg max-h-60 w-full object-cover border border-border-color" />
                             <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/70 transition-colors">
                                <Icon name="XMark" className="w-4 h-4" />
                            </button>
                         </div>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center mt-3 ml-14">
                <div className="flex space-x-1 sm:space-x-2 text-text-secondary">
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-secondary hover:text-green-500 cursor-pointer">
                        <Icon name="Photo" className="w-6 h-6" />
                        <input ref={fileInputRef} id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary hover:text-blue-500"><Icon name="ChartBar" className="w-6 h-6" /></button>
                    <button className="p-2 rounded-full hover:bg-secondary hover:text-yellow-500"><Icon name="FaceSmile" className="w-6 h-6" /></button>
                    <button className="p-2 rounded-full hover:bg-secondary hover:text-red-500"><Icon name="MapPin" className="w-6 h-6" /></button>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!content.trim() && !image}
                    className="bg-accent text-white font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
