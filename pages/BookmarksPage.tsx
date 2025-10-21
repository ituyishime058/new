
import React from 'react';
// FIX: Add file extension to import.
import { Post as PostType, User } from '../types.ts';
import Post from '../components/Post';
import Icon from '../components/Icon';

interface BookmarksPageProps {
  posts: PostType[];
  onViewProfile: (user: User) => void;
  onUpdatePost: (post: PostType) => void;
}

const BookmarksPage: React.FC<BookmarksPageProps> = ({ posts, onViewProfile, onUpdatePost }) => {
  return (
    <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        <header className="p-4 border-b border-border-color flex items-center space-x-3">
            <Icon name="Bookmark" className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold text-text-primary">Bookmarks</h1>
        </header>
        <div className="space-y-4">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} post={post} onViewProfile={onViewProfile} onUpdatePost={onUpdatePost} />
                ))
            ) : (
                <div className="text-center py-16 text-text-secondary">
                    <Icon name="BookmarkSlash" className="w-16 h-16 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">No Bookmarks Yet</h3>
                    <p className="mt-1">Save posts to see them here.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default BookmarksPage;