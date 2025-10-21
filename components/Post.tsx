import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType, User, Comment as CommentType } from '../types.ts';
import { currentUser } from '../constants.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';
import Comment from './Comment.tsx';
import Poll from './Poll.tsx';
import ShareModal from './ShareModal.tsx';
import { renderInteractiveText } from '../utils/textUtils.ts';
import ImageModal from './ImageModal.tsx';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile, onUpdatePost = () => {} }) => {
    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);

    const handleLike = () => {
        const newLikes = isLiked ? post.likes - 1 : post.likes + 1;
        setIsLiked(!isLiked);
        onUpdatePost({...post, likes: newLikes});
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        onUpdatePost({...post, isBookmarked: !isBookmarked});
    };
    
    return (
        <>
        <article className="p-4 border-b border-border-color">
            <div className="flex space-x-4">
                <Avatar src={post.author.avatarUrl} alt={post.author.name} />
                <div className="w-full">
                    <div className="flex items-baseline space-x-2">
                        <button onClick={() => onViewProfile(post.author)} className="font-bold text-text-primary hover:underline">{post.author.name}</button>
                        <span className="text-sm text-text-secondary">@{post.author.handle}</span>
                        <span className="text-sm text-text-secondary">·</span>
                        <span className="text-sm text-text-secondary hover:underline">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
                    </div>
                    <p className="text-text-primary mt-1 whitespace-pre-wrap">
                        {renderInteractiveText(post.content, onViewProfile, (tag) => console.log(tag))}
                    </p>
                    
                    {post.imageUrl && (
                        <div className="mt-3 rounded-2xl border border-border-color overflow-hidden cursor-pointer" onClick={() => setImageModalOpen(true)}>
                            <img src={post.imageUrl} alt="Post content" className="w-full object-cover" />
                        </div>
                    )}

                    {post.poll && (
                        <div className="mt-3">
                            <Poll pollData={post.poll} />
                        </div>
                    )}

                    <div className="flex justify-between items-center text-text-secondary mt-4">
                        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-accent group">
                            <Icon name="ChatBubbleOvalLeft" className="w-5 h-5" />
                            <span className="text-sm">{post.comments.length}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-green-500 group">
                            <Icon name="ArrowPathRoundedSquare" className="w-5 h-5" />
                            <span className="text-sm">0</span>
                        </button>
                        <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-red-500 group ${isLiked ? 'text-red-500' : ''}`}>
                            <Icon name="Heart" variant={isLiked ? 'solid' : 'outline'} className="w-5 h-5" />
                            <span className="text-sm">{isLiked ? post.likes + 1 : post.likes}</span>
                        </button>
                        <button onClick={() => setShareModalOpen(true)} className="hover:text-accent group">
                            <Icon name="ArrowUpOnSquare" className="w-5 h-5" />
                        </button>
                        <button onClick={handleBookmark} className={`hover:text-accent group ${isBookmarked ? 'text-accent' : ''}`}>
                            <Icon name="Bookmark" variant={isBookmarked ? 'solid' : 'outline'} className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
            {showComments && (
                <div className="pl-14 pt-4 space-y-4">
                    {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                    {/* Add comment input */}
                     <div className="flex items-start space-x-3 pt-4 border-t border-border-color/50">
                        <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
                        <div className="w-full">
                            <input
                                placeholder={`Reply to @${post.author.handle}...`}
                                className="w-full bg-secondary px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>
                    </div>
                </div>
            )}
        </article>
        <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} post={post} />
        <ImageModal isOpen={isImageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={post.imageUrl || ''} />
        </>
    );
};

export default Post;
