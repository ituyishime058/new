
import { User, Post, Comment, Story, Notification, Conversation, Reel, Poll, Highlight, LoginActivity, TrendingTopic } from './types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  handle: 'alexj',
  avatarUrl: '/avatars/alex.jpg',
  bio: 'Frontend Developer | Building cool things with React & TypeScript 🚀',
  followers: 1258,
  following: 342,
};

export const nexusAiUser: User = {
    id: 'nexus-ai',
    name: 'Nexus AI',
    handle: 'nexusai',
    avatarUrl: '/avatars/nexus-ai.png',
};

export const users: User[] = [
    currentUser,
    { id: 'user-2', name: 'Samantha Bee', handle: 'sambee', avatarUrl: '/avatars/samantha.jpg', isOnline: true, isFollowing: true },
    { id: 'user-3', name: 'Charlie Davis', handle: 'cdavis', avatarUrl: '/avatars/charlie.jpg', isOnline: false, isFollowing: false },
    { id: 'user-4', name: 'Diana Prince', handle: 'di_prince', avatarUrl: '/avatars/diana.jpg', isOnline: true, isFollowing: true },
    { id: 'user-5', name: 'Ethan Hunt', handle: 'ethanh', avatarUrl: '/avatars/ethan.jpg', isOnline: false, isFollowing: false },
    { id: 'user-6', name: 'Fiona Glenanne', handle: 'fiona.g', avatarUrl: '/avatars/fiona.jpg', isOnline: true, isFollowing: true },
    nexusAiUser,
];

export const comments: Comment[] = [
    { id: 'comment-1', user: users[2], text: 'This is amazing!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'comment-2', user: users[3], text: 'Great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { id: 'comment-3', user: users[1], text: 'Love this!', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 'comment-4', user: users[4], text: 'Where was this taken?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];

const samplePoll: Poll = {
  id: 'poll-1',
  question: 'What should be the next big feature?',
  options: [
    { id: 'opt-1', text: 'Live Audio Spaces', votes: 120 },
    { id: 'opt-2', text: 'Advanced AI Tools', votes: 256 },
    { id: 'opt-3', text: 'E-commerce Integration', votes: 88 },
  ]
};

export const posts: Post[] = [
    { id: 'post-1', author: users[1], content: 'Just enjoying a beautiful sunset. #nofilter #nature', imageUrl: '/posts/sunset.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), likes: 156, comments: [comments[0]], isBookmarked: true },
    { id: 'post-2', author: users[2], content: 'Excited to share my latest project! It\'s a social media dashboard built with Next.js. Let me know what you think! @alexj #webdev #react', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), likes: 320, comments: [comments[1], comments[2]] },
    { id: 'post-3', author: users[3], content: 'What a game! Can\'t believe that last-minute goal. ⚽️ #soccer #sports', imageUrl: '/posts/soccer.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), likes: 88, comments: [], isBookmarked: true },
    { id: 'post-4', author: users[0], content: 'Trying out the new poll feature. Cast your votes!', poll: samplePoll, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), likes: 42, comments: [] },
    { id: 'post-5', author: users[4], content: 'Exploring the city streets. So much history in one place.', imageUrl: '/posts/city.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), likes: 215, comments: [comments[3]] },
];

export const stories: Story[] = [
    { id: 'story-1', user: users[1], imageUrl: '/stories/story1.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), duration: 5000 },
    { id: 'story-2', user: users[2], imageUrl: '/stories/story2.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), duration: 7000 },
    { id: 'story-3', user: users[3], imageUrl: '/stories/story3.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), duration: 6000 },
    { id: 'story-4', user: users[4], imageUrl: '/stories/story4.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), duration: 5000 },
];

export const highlights: Highlight[] = [
    { id: 'hl-1', title: 'Travel', coverImageUrl: '/highlights/travel.jpg', stories: [stories[0], stories[3]]},
    { id: 'hl-2', title: 'Projects', coverImageUrl: '/highlights/projects.jpg', stories: [stories[1]]},
    { id: 'hl-3', title: 'Food', coverImageUrl: '/highlights/food.jpg', stories: [stories[2]]},
];

export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[1], post: { content: posts[3].content }, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), read: false },
    { id: 'notif-2', type: 'follow', user: users[4], timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), read: false },
    { id: 'notif-3', type: 'comment', user: users[2], post: { content: posts[1].content }, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
    { id: 'notif-4', type: 'like', user: users[3], post: { content: posts[3].content }, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), read: true },
];

export const conversations: Conversation[] = [
    {
        id: 'convo-ai',
        user: nexusAiUser,
        unreadCount: 0,
        messages: [
            { id: 'ai-msg-1', sender: nexusAiUser, text: 'Hello! I am Nexus AI. How can I help you today?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
        ],
    },
    {
        id: 'convo-1',
        user: users[1],
        unreadCount: 2,
        messages: [
            { id: 'msg-1-1', sender: users[1], text: 'Hey, did you see the project update?', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
            { id: 'msg-1-2', sender: users[1], text: 'Let me know what you think!', timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(), read: false },
        ],
    },
    {
        id: 'convo-2',
        user: users[3],
        unreadCount: 0,
        messages: [
            { id: 'msg-2-1', sender: currentUser, text: 'Great game last night!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
            { id: 'msg-2-2', sender: users[3], text: 'Absolutely! That final play was insane.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
        ],
    },
];

export const reels: Reel[] = [
    { id: 'reel-1', user: users[4], videoUrl: '/videos/reel1.mp4', caption: 'Dancing in the rain!', audio: { title: 'Upbeat Funk', artist: 'StockMusic' }, likes: 12345, comments: 245, shares: 120 },
    { id: 'reel-2', user: users[5], videoUrl: '/videos/reel2.mp4', caption: 'My new puppy is the cutest.', audio: { title: 'Cute Moments', artist: 'StockMusic' }, likes: 54321, comments: 1234, shares: 879 },
];

export const trendingTopics: TrendingTopic[] = [
    { tag: 'TechConference2024', posts: 12500, imageUrl: '/trending/tech.jpg' },
    { tag: 'SummerVibes', posts: 89000, imageUrl: '/trending/summer.jpg' },
    { tag: 'NewMusicFriday', posts: 42300, imageUrl: '/trending/music.jpg' },
];

export const loginActivity: LoginActivity[] = [
    { id: 'la-1', device: 'Chrome on macOS', location: 'New York, NY', ipAddress: '192.168.1.1', timestamp: new Date().toISOString(), isCurrent: true },
    { id: 'la-2', device: 'Nexus App on iPhone 15', location: 'New York, NY', ipAddress: '192.168.1.1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isCurrent: false },
];
