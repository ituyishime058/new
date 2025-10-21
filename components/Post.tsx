
import React, { useState } from 'react';
// FIX: Add file extension to imports.
import { Post as PostType, User } from '../types.ts';
import { currentUser } from '../constants.ts';
import { formatDistanceToNow } from 'date-fns';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import ImageModal from './ImageModal';
import Poll from './Poll';
import ShareModal from './ShareModal';
import ReactionPicker from './ReactionPicker';
import { renderInteractiveText } from '../utils/textUtils.ts';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile, onUpdatePost = () => {} }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleBookmark = () => {
        const newBookmarkState = !isBookmarked;
        setIsBookmarked(newBookmarkState);
        onUpdatePost({...post, isBookmarked: newBookmarkState});
    };
    
    const handleReactionSelect = (reaction: string) => {
        console.log(`Reacted with ${reaction}`);
        setShowReactionPicker(false);
        // In a real app, you would update the post with the reaction
    };

    return (
        <>
        <div className="p-4 border-b border-border-color last:border-b-0">
            <header className="flex items-center space-x-3">
                <button onClick={() => onViewProfile(post.author)}>
                    <Avatar src={post.author.avatarUrl} alt={post.author.name} />
                </button>
                <div>
                    <button onClick={() => onViewProfile(post.author)} className="font-bold text-text-primary hover:underline">{post.author.name}</button>
                    <p className="text-sm text-text-secondary">@{post.author.handle} · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</p>
                </div>
                <button className="ml-auto p-2 rounded-full hover:bg-secondary">
                    <Icon name="EllipsisHorizontal" className="w-6 h-6" />
                </button>
            </header>

            <div className="mt-3 ml-14">
                <div className="text-text-primary whitespace-pre-wrap">
                    {renderInteractiveText(post.content, onViewProfile, (tag) => console.log(`Clicked hashtag #${tag}`))}
                </div>
                {post.imageUrl && (
                    <div className="mt-3 -ml-14 -mr-4 md:ml-0 md:mr-0">
                        <img 
                            src={post.imageUrl} 
                            alt="Post content" 
                            className="rounded-xl object-cover w-full cursor-pointer border border-border-color" 
                            onClick={() => setImageModalOpen(true)}
                        />
                    </div>
                )}
                {post.poll && <div className="mt-3"><Poll pollData={post.poll} /></div>}
            </div>

            <footer className="flex justify-between items-center mt-3 ml-14 text-text-secondary">
                 <div className="flex items-center space-x-1 relative">
                    <button 
                        onMouseEnter={() => setShowReactionPicker(true)}
                        onMouseLeave={() => setShowReactionPicker(false)}
                        onClick={handleLike} 
                        className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500 hover:bg-red-500/10'}`}
                    >
                        <Icon name="Heart" variant={isLiked ? 'solid' : 'outline'} className="w-6 h-6" />
                        <span className="text-sm font-semibold">{likeCount}</span>
                    </button>
                    {showReactionPicker && <ReactionPicker onSelect={handleReactionSelect} />}
                </div>

                <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 p-2 rounded-full hover:text-blue-500 hover:bg-blue-500/10">
                    <Icon name="ChatBubbleOvalLeft" className="w-6 h-6" />
                    <span className="text-sm font-semibold">{post.comments.length}</span>
                </button>
                <button onClick={() => setShareModalOpen(true)} className="flex items-center space-x-2 p-2 rounded-full hover:text-green-500 hover:bg-green-500/10">
                    <Icon name="ArrowUpOnSquare" className="w-6 h-6" />
                </button>
                 <button onClick={handleBookmark} className={`p-2 rounded-full ${isBookmarked ? 'text-yellow-500' : 'hover:text-yellow-500 hover:bg-yellow-500/10'}`}>
                    <Icon name="Bookmark" variant={isBookmarked ? 'solid' : 'outline'} className="w-6 h-6" />
                </button>
            </footer>

            {showComments && (
                <div className="mt-4 ml-14 space-y-4">
                    {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                    <div className="flex items-center space-x-3">
                         <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
                         <input type="text" placeholder="Write a comment..." className="w-full bg-secondary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                </div>
            )}
        </div>
        <ImageModal isOpen={isImageModalOpen} onClose={() => setImageModalOpen(false)} imageUrl={post.imageUrl || ''} />
        <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} post={post} />
        </>
    );
};

export default Post;
