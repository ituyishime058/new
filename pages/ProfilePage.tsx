
import React, { useState } from 'react';
import { User, Post as PostType } from '../types';
import { posts, currentUser, highlights } from '../constants';
import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import Post from '../components/Post';
import EditProfileModal from '../components/EditProfileModal';
import FollowListModal from '../components/FollowListModal';
import Highlights from '../components/Highlights';
import ProfileActivityGraph from '../components/ProfileActivityGraph';

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onViewProfile: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack, onViewProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserProfile, setCurrentUserProfile] = useState(user);
    const [followersModalOpen, setFollowersModalOpen] = useState(false);
    const [followingModalOpen, setFollowingModalOpen] = useState(false);

    const isOwnProfile = user.id === currentUser.id;
    const userPosts = posts.filter(p => p.author.id === user.id);

    const handleSaveProfile = (updatedUser: User) => {
        setCurrentUserProfile(updatedUser);
        // In a real app, you would also make an API call here.
    };

    return (
        <>
            <div className="bg-primary shadow-md rounded-xl overflow-hidden">
                <div className="h-48 bg-secondary relative">
                    <img src="/banners/profile-banner.jpg" alt="Profile banner" className="w-full h-full object-cover" />
                    <div className="absolute -bottom-16 left-6">
                        <Avatar src={currentUserProfile.avatarUrl} alt={currentUserProfile.name} size="lg" />
                    </div>
                </div>

                <div className="p-6 pt-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-text-primary">{currentUserProfile.name}</h1>
                            <p className="text-text-secondary">@{currentUserProfile.handle}</p>
                        </div>
                        {isOwnProfile ? (
                            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-secondary font-semibold rounded-full hover:bg-border-color">Edit Profile</button>
                        ) : (
                            <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-accent text-white font-semibold rounded-full">Follow</button>
                                <button className="px-4 py-2 bg-secondary font-semibold rounded-full">Message</button>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-text-primary">{currentUserProfile.bio}</p>

                    <div className="flex space-x-6 mt-4 text-text-secondary">
                        <button onClick={() => setFollowingModalOpen(true)} className="hover:underline"><span className="font-bold text-text-primary">{currentUserProfile.following}</span> Following</button>
                        <button onClick={() => setFollowersModalOpen(true)} className="hover:underline"><span className="font-bold text-text-primary">{currentUserProfile.followers}</span> Followers</button>
                    </div>
                </div>

                <Highlights highlights={highlights} />

                <div className="p-4">
                  <ProfileActivityGraph />
                </div>

                <div>
                    <h2 className="p-4 text-lg font-bold border-t border-border-color">Posts</h2>
                    <div className="space-y-4">
                        {userPosts.map(post => <Post key={post.id} post={post} onViewProfile={onViewProfile} />)}
                    </div>
                </div>
            </div>

            <EditProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)} user={currentUserProfile} onSave={handleSaveProfile} />
            <FollowListModal isOpen={followersModalOpen} onClose={() => setFollowersModalOpen(false)} title="Followers" onViewProfile={onViewProfile} />
            <FollowListModal isOpen={followingModalOpen} onClose={() => setFollowingModalOpen(false)} title="Following" onViewProfile={onViewProfile} />
        </>
    );
};

export default ProfilePage;
