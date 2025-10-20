import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType, User, Comment as CommentType } from '../types';
import { currentUser } from '../constants';
import { renderInteractiveText } from '../utils/textUtils';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import Poll from './Poll';
import VideoPlayer from './VideoPlayer';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost?: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post: initialPost, onViewProfile, onUpdatePost }) => {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };
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

  return (
    <div className="bg-primary p-4 border-b border-border-color last:border-b-0">
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
        <button onClick={handleLike} className="flex items-center space-x-2 hover:text-red-500">
          <Icon name="Heart" className={`w-6 h-6 ${post.isLiked ? 'text-red-500' : ''}`} variant={post.isLiked ? 'solid' : 'outline'} />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-blue-500">
          <Icon name="ChatBubbleOvalLeft" className="w-6 h-6" />
          <span className="text-sm">{post.comments.length}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <Icon name="ArrowPathRoundedSquare" className="w-6 h-6" />
        </button>
        <button className="flex items-center space-x-2 hover:text-accent">
          <Icon name="ArrowUpTray" className="w-6 h-6" />
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-border-color">
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
              <Icon name="PaperAirplane" className={`w-6 h-6 ${!newComment.trim() ? 'text-text-secondary' : 'text-accent'}`} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
