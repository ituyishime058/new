import React, { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType, User, Comment as CommentType } from '../types';
import { currentUser } from '../constants';
import { renderInteractiveText } from '../utils/textUtils';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import Poll from './Poll';
import VideoPlayer from './VideoPlayer';
import ReactionPicker from './ReactionPicker';
import ShareModal from './ShareModal';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post: initialPost, onViewProfile, onUpdatePost }) => {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const likeTimeoutRef = useRef<number | null>(null);

  const handleLike = () => {
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };
    setPost(updatedPost);
    onUpdatePost?.(updatedPost);
  };

  const handleBookmark = () => {
    const updatedPost = { ...post, isBookmarked: !post.isBookmarked };
    setPost(updatedPost);
    onUpdatePost?.(updatedPost);
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: CommentType = {
      id: `comment-${Date.now()}`,
      user: currentUser,
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, comment],
    };
    setPost(updatedPost);
    onUpdatePost?.(updatedPost);
    setNewComment('');
  };

  const handleLikeMouseDown = () => {
    likeTimeoutRef.current = window.setTimeout(() => {
        setShowReactionPicker(true);
    }, 500);
  };
  
  const handleLikeMouseUp = () => {
      if (likeTimeoutRef.current) {
          clearTimeout(likeTimeoutRef.current);
          likeTimeoutRef.current = null;
      }
  };
  
  const handleReactionSelect = (reaction: string) => {
      // In a real app, you'd update the reaction counts
      console.log(`Reacted with ${reaction}`);
      setShowReactionPicker(false);
  }

  return (
    <>
    <div className="p-px bg-transparent hover:bg-gradient-to-r from-accent-start to-accent-end rounded-xl transition-all duration-300">
        <div className="bg-primary p-4 rounded-xl">
            <header className="flex items-center space-x-3 mb-3">
                <button onClick={() => onViewProfile(post.author)}>
                <Avatar src={post.author.avatarUrl} alt={post.author.name} />
                </button>
                <div>
                <button onClick={() => onViewProfile(post.author)} className="font-bold text-text-primary hover:underline">
                    {post.author.name}
                </button>
                <p className="text-sm text-text-secondary">
                    @{post.author.handle} · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </p>
                </div>
                <button className="ml-auto p-2 rounded-full hover:bg-secondary">
                <Icon name="EllipsisHorizontal" className="w-6 h-6" />
                </button>
            </header>

            <div className="text-text-primary mb-3">
                {renderInteractiveText(post.content, onViewProfile, (tag) => console.log(`Clicked hashtag: #${tag}`))}
            </div>

            {post.imageUrl && (
                <div className="rounded-lg overflow-hidden border border-border-color mb-3">
                <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />
                </div>
            )}
            {post.videoUrl && (
                <div className="rounded-lg overflow-hidden border border-border-color mb-3 aspect-video">
                    <VideoPlayer src={post.videoUrl} />
                </div>
            )}

            {post.poll && (
                <div className="mb-3">
                <Poll pollData={post.poll} />
                </div>
            )}

            <div className="flex justify-between items-center text-text-secondary">
                <div className="relative flex items-center">
                    <button 
                        onClick={handleLike} 
                        onMouseDown={handleLikeMouseDown}
                        onMouseUp={handleLikeMouseUp}
                        onTouchStart={handleLikeMouseDown}
                        onTouchEnd={handleLikeMouseUp}
                        className="flex items-center space-x-2 hover:text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-colors duration-200"
                    >
                    <Icon name="Heart" className={`w-6 h-6 transform transition-transform duration-200 group-hover:scale-110 ${post.isLiked ? 'text-red-500' : ''}`} variant={post.isLiked ? 'solid' : 'outline'} />
                    <span className="text-sm font-semibold">{post.likes}</span>
                    </button>
                    {showReactionPicker && <ReactionPicker onSelect={handleReactionSelect} />}
                </div>

                <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-blue-500 p-2 rounded-full hover:bg-blue-500/10 transition-colors duration-200">
                <Icon name="ChatBubbleOvalLeft" className="w-6 h-6 transform transition-transform duration-200 group-hover:scale-110" />
                <span className="text-sm font-semibold">{post.comments.length}</span>
                </button>
                <button onClick={() => setShowShareModal(true)} className="flex items-center space-x-2 hover:text-green-500 p-2 rounded-full hover:bg-green-500/10 transition-colors duration-200">
                <Icon name="ArrowUpTray" className="w-6 h-6 transform transition-transform duration-200 group-hover:scale-110" />
                </button>
                <button onClick={handleBookmark} className="flex items-center space-x-2 hover:text-accent p-2 rounded-full hover:bg-accent/10 transition-colors duration-200">
                <Icon name="Bookmark" className={`w-6 h-6 transform transition-transform duration-200 group-hover:scale-110 ${post.isBookmarked ? 'text-accent' : ''}`} variant={post.isBookmarked ? 'solid' : 'outline'} />
                </button>
            </div>

            {showComments && (
                <div className="mt-4 pt-4 border-t border-border-color animate-fade-in">
                <div className="space-y-4 mb-4">
                    {post.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
                <form onSubmit={handleAddComment} className="flex items-center space-x-2">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
                    <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-secondary border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button type="submit" disabled={!newComment.trim()}>
                    <Icon name="PaperAirplane" className={`w-6 h-6 transition-colors ${!newComment.trim() ? 'text-text-secondary' : 'text-accent'}`} />
                    </button>
                </form>
                </div>
            )}
        </div>
    </div>
    <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} post={post} />
    </>
  );
};

export default Post;
