
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post as PostType, User } from '../types.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';
import Comment from './Comment.tsx';
import Poll from './Poll.tsx';
import { renderInteractiveText } from '../utils/textUtils.ts';

interface PostProps {
  post: PostType;
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const Post: React.FC<PostProps> = ({ post, onViewProfile, onUpdatePost }) => {
    const [isLiked, setIsLiked] = React.useState(post.isLiked);
    const [likes, setLikes] = React.useState(post.likes);
    const [isBookmarked, setIsBookmarked] = React.useState(post.isBookmarked);

    const handleLike = () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikes(prev => newIsLiked ? prev + 1 : prev - 1);
        onUpdatePost({ ...post, isLiked: newIsLiked, likes: newIsLiked ? post.likes + 1 : post.likes -1 });
    }
    
    const handleBookmark = () => {
        const newIsBookmarked = !isBookmarked;
        setIsBookmarked(newIsBookmarked);
        onUpdatePost({ ...post, isBookmarked: newIsBookmarked });
    }

    return (
        <div className="bg-primary p-4 rounded-xl shadow-sm border-b border-border-color">
            <div className="flex space-x-3">
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
                    <div className="mt-2 text-text-primary">
                        {renderInteractiveText(post.content, onViewProfile, (tag) => console.log(`Clicked hashtag: #${tag}`))}
                    </div>
                </div>
            </div>

            <div className="mt-3 ml-12">
                 {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="rounded-lg border border-border-color max-h-96 w-full object-cover" />}
                 {post.poll && <Poll pollData={post.poll} />}
            </div>

            <div className="mt-4 ml-12 flex justify-between items-center text-text-secondary">
                <div className="flex space-x-6">
                     <button onClick={handleLike} className={`flex items-center space-x-2 group ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <Icon name="Heart" className={`w-6 h-6 group-hover:text-red-500`} variant={isLiked ? 'solid' : 'outline'}/>
                        <span>{likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-accent group">
                        <Icon name="ChatBubbleOvalLeft" className="w-6 h-6 group-hover:text-accent"/>
                        <span>{post.comments.length}</span>
                    </button>
                     <button className="flex items-center space-x-2 hover:text-green-500 group">
                        <Icon name="ArrowPath" className="w-6 h-6 group-hover:text-green-500"/>
                        <span>Repost</span>
                    </button>
                </div>
                <div>
                     <button onClick={handleBookmark} className={`flex items-center space-x-2 group ${isBookmarked ? 'text-accent' : 'hover:text-accent'}`}>
                        <Icon name="Bookmark" className={`w-6 h-6 group-hover:text-accent`} variant={isBookmarked ? 'solid' : 'outline'}/>
                    </button>
                </div>
            </div>
            
             {/* Comments Section (simplified) */}
            {post.comments.length > 0 && (
                <div className="mt-4 ml-12 border-t border-border-color pt-4">
                     {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </div>
            )}
        </div>
    );
};

export default Post;