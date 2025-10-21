
import React, { useState } from 'react';
import { Post as PostType, User } from '../types';
import { currentUser } from '../constants';
import { formatDistanceToNow } from 'date-fns';
import { renderInteractiveText } from '../utils/textUtils';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import ReactionPicker from './ReactionPicker';
import Poll from './Poll';
import ShareModal from './ShareModal';
import VideoPlayer from './VideoPlayer';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile, onUpdatePost = () => {} }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likes, setLikes] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
        onUpdatePost({...post, isLiked: !isLiked, likes: isLiked ? post.likes -1 : post.likes + 1});
    };
    
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        onUpdatePost({...post, isBookmarked: !isBookmarked});
    };

    const handleReactionSelect = (reaction: string) => {
        console.log(reaction);
        setShowReactionPicker(false);
        // In a real app, you would add the reaction to the post
        handleLike(); // For now, just treat it as a like
    };

    return (
        <div className="bg-primary p-4 border-b border-border-color last:border-b-0">
            <header className="flex items-center space-x-3 mb-3">
                <button onClick={() => onViewProfile(post.author)}>
                    <Avatar src={post.author.avatarUrl} alt={post.author.name} />
                </button>
                <div className="flex-1">
                    <button onClick={() => onViewProfile(post.author)} className="font-bold text-text-primary hover:underline">{post.author.name}</button>
                    <p className="text-sm text-text-secondary">@{post.author.handle} · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</p>
                </div>
                <button className="p-2 rounded-full hover:bg-secondary">
                    <Icon name="EllipsisHorizontal" className="w-6 h-6 text-text-secondary" />
                </button>
            </header>
            
            <div className="ml-12 mb-3">
                <p className="text-text-primary whitespace-pre-wrap">
                    {renderInteractiveText(post.content, onViewProfile, (tag) => console.log(tag))}
                </p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="mt-3 rounded-xl border border-border-color max-h-[60vh] w-full object-cover" />}
                {post.videoUrl && <div className="mt-3 rounded-xl border border-border-color overflow-hidden aspect-video"><VideoPlayer src={post.videoUrl} /></div>}
                {post.poll && <div className="mt-3"><Poll pollData={post.poll} /></div>}
            </div>

            <footer className="ml-12 flex items-center justify-between text-text-secondary">
                <div className="flex items-center space-x-6">
                    <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-blue-500">
                        <Icon name="ChatBubbleOvalLeft" className="w-6 h-6" />
                        <span className="text-sm">{post.comments.length}</span>
                    </button>
                    <div className="relative">
                        <button onMouseEnter={() => setShowReactionPicker(true)} onMouseLeave={() => setShowReactionPicker(false)} onClick={handleLike} className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                            <Icon name="Heart" variant={isLiked ? 'solid' : 'outline'} className="w-6 h-6" />
                            <span className="text-sm">{likes}</span>
                        </button>
                        {showReactionPicker && <ReactionPicker onSelect={handleReactionSelect} />}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setShareModalOpen(true)} className="p-2 rounded-full hover:bg-secondary hover:text-green-500">
                        <Icon name="ArrowUpOnSquare" className="w-6 h-6" />
                    </button>
                     <button onClick={handleBookmark} className="p-2 rounded-full hover:bg-secondary hover:text-yellow-500">
                        <Icon name="Bookmark" variant={isBookmarked ? 'solid' : 'outline'} className={`w-6 h-6 ${isBookmarked ? 'text-yellow-500' : ''}`} />
                    </button>
                </div>
            </footer>

            {showComments && post.comments.length > 0 && (
                <div className="ml-12 mt-4 space-y-4 pt-4 border-t border-border-color">
                    {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </div>
            )}
            <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} post={post} />
        </div>
    );
};

export default Post;
