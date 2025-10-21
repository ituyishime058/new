
import React, { useState, useMemo } from 'react';
// FIX: Add file extension to imports.
import { users, posts } from '../constants.ts';
import { User, Post } from '../types.ts';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';

interface SearchPageProps {
  onViewProfile: (user: User) => void;
}

const UserSearchResult: React.FC<{ user: User, onViewProfile: (user: User) => void }> = ({ user, onViewProfile }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    return (
        <div className="flex items-center justify-between">
            <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                <div>
                    <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                    <p className="text-xs text-text-secondary">@{user.handle}</p>
                </div>
            </button>
            <button 
                onClick={() => setIsFollowing(!isFollowing)}
                 className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                    isFollowing 
                    ? 'bg-secondary text-text-primary border border-border-color' 
                    : 'bg-accent text-white hover:opacity-90'
                }`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};

const SearchPage: React.FC<SearchPageProps> = ({ onViewProfile }) => {
    const [query, setQuery] = useState('');

    const filteredUsers = useMemo(() => {
        if (!query) return [];
        return users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) || 
            user.handle.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    const filteredPosts = useMemo(() => {
        if (!query) return [];
        return posts.filter(post => 
            post.content.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    return (
        <div className="bg-primary shadow-md rounded-xl p-4 min-h-[60vh]">
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search for people or posts"
                    className="w-full bg-secondary border border-border-color rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="MagnifyingGlass" className="w-6 h-6 text-text-secondary" />
                </div>
            </div>

            {query ? (
                <div className="animate-fade-in">
                    {filteredUsers.length > 0 && (
                        <div className="mb-8">
                            <h2 className="font-bold text-lg mb-4">People</h2>
                            <div className="space-y-4">
                                {filteredUsers.map(user => (
                                    <UserSearchResult key={user.id} user={user} onViewProfile={onViewProfile} />
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredPosts.length > 0 && (
                        <div>
                            <h2 className="font-bold text-lg mb-4">Posts</h2>
                            <div className="space-y-4">
                                {filteredPosts.map(post => (
                                    <div key={post.id} className="flex space-x-4 p-2 rounded-lg hover:bg-secondary">
                                        {post.imageUrl && <img src={post.imageUrl} className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>}
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-semibold text-text-primary truncate">{post.content}</p>
                                            <button onClick={() => onViewProfile(post.author)} className="text-xs text-text-secondary mt-1 hover:underline">by {post.author.name}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                        <div className="text-center py-10 text-text-secondary">
                            <p>No results found for "{query}"</p>
                        </div>
                    )}

                </div>
            ) : (
                <div>
                    <h2 className="font-bold text-lg mb-4">Recent Searches</h2>
                    <div className="space-y-4">
                        {users.slice(1, 4).map(user => (
                            <div key={user.id} className="flex items-center justify-between">
                                <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group">
                                    <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                                    <div>
                                        <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                                        <p className="text-xs text-text-secondary">@{user.handle}</p>
                                    </div>
                                </button>
                                <button className="text-text-secondary hover:text-text-primary">
                                    <Icon name="XMark" className="w-5 h-5"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
