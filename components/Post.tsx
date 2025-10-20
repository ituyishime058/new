import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Post as PostType, User, Comment as CommentType } from '../types';
import { currentUser } from '../constants';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import ImageModal from './ImageModal';
import VideoPlayer from './VideoPlayer';
import Poll from './Poll';
import ReactionPicker from './ReactionPicker';
import { renderInteractiveText } from '../utils/textUtils';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile, onUpdatePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleReaction = (reaction: string) => {
    const currentReactions = { ...(post.reactions || {}) };
    currentReactions[reaction] = (currentReactions[reaction] || 0) + 1;
    onUpdatePost({ ...post, reactions: currentReactions });
    setShowReactionPicker(false);
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
    onUpdatePost({ ...post, comments: [...post.comments, comment] });
    setNewComment('');
  };
  
  // FIX: Explicitly convert `count` to a number to avoid potential type errors with the '+' operator.
  const totalReactions = Object.values(post.reactions || {}).reduce((sum, count) => sum + Number(count), 0);

  const handleHashtagClick = (tag: string) => {
    // In a real app, this would navigate to a search page for that tag
    console.log(`Clicked hashtag: ${tag}`);
  };

  return (
    <>
      <div className="bg-primary p-4 border-b border-border-color">
        <div className="flex items-start space-x-3">
          <button onClick={() => onViewProfile(post.author)}>
            <Avatar src={post.author.avatarUrl} alt={post.author.name} />
          </button>
          <div className="flex-1">
            <div className="flex items-baseline space-x-2">
              <button onClick={() => onViewProfile(post.author)} className="font-bold text-text-primary hover:underline">{post.author.name}</button>
              <p className="text-sm text-text-secondary">@{post.author.handle}</p>
              <span className="text-sm text-text-secondary">·</span>
              <p className="text-sm text-text-secondary">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</p>
            </div>
            <p className="text-text-primary mt-1 whitespace-pre-wrap">
                {renderInteractiveText(post.content, onViewProfile, handleHashtagClick)}
            </p>

            {post.imageUrl && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border-color cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover max-h-[600px]" />
              </div>
            )}

            {post.videoUrl && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border-color aspect-video">
                <VideoPlayer src={post.videoUrl} />
              </div>
            )}
            
            {post.poll && (
                <div className="mt-3">
                    <Poll pollData={post.poll} />
                </div>
            )}

            <div className="flex justify-between items-center mt-4 text-text-secondary">
              <button className="flex items-center space-x-2 hover:text-blue-500" onClick={() => setShowComments(!showComments)}>
                <Icon name="ChatBubbleOvalLeft" className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500">
                <Icon name="ArrowPathRoundedSquare" className="w-5 h-5" />
                <span>{Math.floor(post.likes / 10)}</span>
              </button>
              <div className="relative">
                <button 
                  onMouseEnter={() => setShowReactionPicker(true)}
                  onMouseLeave={() => setShowReactionPicker(false)}
                  className={`flex items-center space-x-2 hover:text-red-500`}
                >
                  <Icon name="Heart" className="w-5 h-5" />
                  <span>{post.likes + totalReactions}</span>
                </button>
                {showReactionPicker && <ReactionPicker onSelect={handleReaction} />}
              </div>
              <button className="flex items-center space-x-2 hover:text-text-primary">
                <Icon name="ArrowUpTray" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {showComments && (
          <div className="mt-4 pl-12 space-y-4 animate-fade-in">
            {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            <div className="flex items-start space-x-3 pt-4">
                <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
                <form onSubmit={handleAddComment} className="flex-1 flex items-center space-x-2">
                    <input 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full bg-secondary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button type="submit" className="p-2 rounded-full hover:bg-secondary disabled:opacity-50" disabled={!newComment.trim()}>
                        <Icon name="PaperAirplane" className="w-5 h-5 text-accent" />
                    </button>
                </form>
            </div>
          </div>
        )}
      </div>
      {post.imageUrl && (
        <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageUrl={post.imageUrl} />
      )}
    </>
  );
};

export default Post;