
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Post as PostType, User } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
import Comment from './Comment';
import ImageModal from './ImageModal';
import VideoPlayer from './VideoPlayer';
import Poll from './Poll';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
            <p className="text-text-primary mt-1 whitespace-pre-wrap">{post.content}</p>

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
              <button className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`} onClick={() => setIsLiked(!isLiked)}>
                <Icon name="Heart" className="w-5 h-5" variant={isLiked ? 'solid' : 'outline'} />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-text-primary">
                <Icon name="ArrowUpTray" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {showComments && (
          <div className="mt-4 pl-12 space-y-4">
            {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
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
