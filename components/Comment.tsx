
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
// FIX: Add file extension to import.
import type { Comment as CommentType } from '../types.ts';
import Avatar from './Avatar';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3">
      <Avatar src={comment.user.avatarUrl} alt={comment.user.name} size="sm" />
      <div className="flex-1">
        <div className="bg-secondary px-4 py-2 rounded-xl">
          <div className="flex items-baseline space-x-2">
            <p className="font-bold text-sm text-text-primary">{comment.user.name}</p>
            <p className="text-xs text-text-secondary">@{comment.user.handle}</p>
          </div>
          <p className="text-text-primary mt-1">{comment.text}</p>
        </div>
        <div className="flex items-center space-x-3 text-xs text-text-secondary mt-1 pl-2">
            <button className="hover:underline">Like</button>
            <span>·</span>
            <button className="hover:underline">Reply</button>
            <span>·</span>
            <span>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;