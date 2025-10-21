import { User, Post, Comment, Story, Conversation, Message, Notification, Highlight, Reel, TrendingTopic, LoginActivity } from './types.ts';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  handle: 'alexj',
  avatarUrl: '/avatars/alex.jpg',
  isOnline: true,
  followers: 1258,
  following: 342,
  bio: 'Frontend Developer | React & TypeScript Enthusiast | Exploring the web, one component at a time.',
};

export const nexusAiUser: User = {
  id: 'nexus-ai',
  name: 'Nexus AI',
  handle: 'nexusai',
  avatarUrl: '/avatars/nexus-ai.png',
  isOnline: true,
};

export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Bella Thorne', handle: 'bellat', avatarUrl: '/avatars/bella.jpg', isOnline: true, isFollowing: true },
  { id: 'user-3', name: 'Chris Evans', handle: 'chrise', avatarUrl: '/avatars/chris.jpg', isOnline: false, isFollowing: false },
  { id: 'user-4', name: 'Diana Prince', handle: 'dianap', avatarUrl: '/avatars/diana.jpg', isOnline: true, isFollowing: true },
  { id: 'user-5', name: 'Ethan Hunt', handle: 'ethanh', avatarUrl: '/avatars/ethan.jpg', isOnline: false, isFollowing: false },
  { id: 'user-6', name: 'Fiona Glenanne', handle: 'fionag', avatarUrl: '/avatars/fiona.jpg', isOnline: true, isFollowing: false },
];

export const comments: Comment[] = [
  { id: 'comment-1', user: users[2], text: 'This looks amazing!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'comment-2', user: users[3], text: 'Wow, great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 'comment-3', user: users[1], text: 'I agree!', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
];

export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just enjoying the beautiful sunset. #nature #travel',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 128,
    isLiked: true,
    isBookmarked: true,
    comments: [comments[1]],
    imageUrl: '/posts/sunset.jpg',
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'What should be the next feature we build for Nexus? #poll #dev',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 256,
    isLiked: false,
    comments: [comments[0]],
    poll: {
      id: 'poll-1',
      question: 'Next big feature?',
      options: [
        { id: 'opt-1', text: 'Live Video Streaming', votes: 120 },
        { id: 'opt-2', text: 'Encrypted DMs', votes: 85 },
        { id: 'opt-3', text: 'AI Post Summaries', votes: 51 },
      ],
    },
  },
  {
    id: 'post-3',
    author: currentUser,
    content: 'Excited to share my new workspace setup! What do you all think?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 54,
    isLiked: false,
    comments: [],
    imageUrl: '/posts/workspace.jpg',
  },
  {
    id: 'post-4',
    author: users[4],
    content: 'Just shipped a new update for our project management tool. Feeling productive! @alexj was a huge help.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 99,
    isLiked: true,
    comments: [],
  },
];

export const stories: Story[] = [
  { id: 'story-1', user: currentUser, imageUrl: '/stories/story-1.jpg', duration: 5, timestamp: new Date().toISOString() },
  { id: 'story-2', user: users[1], imageUrl: '/stories/story-2.jpg', duration: 7, isSeen: false, timestamp: new Date().toISOString() },
  { id: 'story-3', user: users[3], imageUrl: '/stories/story-3.jpg', duration: 5, isSeen: false, timestamp: new Date().toISOString() },
  { id: 'story-4', user: users[4], imageUrl: '/stories/story-4.jpg', duration: 8, isSeen: true, timestamp: new Date().toISOString() },
];

const sampleMessages: Message[] = [
  { id: 'm1', sender: users[1], text: 'Hey, how are you?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
  { id: 'm2', sender: currentUser, text: 'Doing great! Just working on the new Nexus feature.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
  { id: 'm3', sender: users[1], text: 'Awesome! Can\'t wait to see it.', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
];

const aiMessages: Message[] = [
    { id: 'ai-m1', sender: nexusAiUser, text: 'Hello Alex! How can I help you today?', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: true },
];

export const conversations: Conversation[] = [
  { id: 'conv-ai', user: nexusAiUser, messages: aiMessages, unreadCount: 0 },
  { id: 'conv-1', user: users[1], messages: sampleMessages, unreadCount: 1 },
  { id: 'conv-2', user: users[3], messages: [{ id: 'm4', sender: users[3], text: 'Can you check out my latest post?', timestamp: new Date().toISOString(), read: false }], unreadCount: 1 },
  { id: 'conv-3', user: users[4], messages: [{ id: 'm5', sender: users[4], text: 'Thanks for the help yesterday!', timestamp: new Date().toISOString(), read: true }], unreadCount: 0 },
];

export const notifications: Notification[] = [
    { id: 'n-1', type: 'follow', user: users[5], timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), read: false },
    { id: 'n-2', type: 'like', user: users[2], post: { id: 'post-3', content: 'Excited to share my new workspace...'}, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), read: false },
    { id: 'n-3', type: 'comment', user: users[1], post: { id: 'post-1', content: 'Just enjoying the beautiful sunset...'}, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), read: true },
];

export const highlights: Highlight[] = [
    { id: 'h-1', title: 'Travel', coverImageUrl: '/highlights/travel.jpg' },
    { id: 'h-2', title: 'Food', coverImageUrl: '/highlights/food.jpg' },
    { id: 'h-3', title: 'Projects', coverImageUrl: '/highlights/projects.jpg' },
];

export const reels: Reel[] = [
    { id: 'r-1', user: users[4], videoUrl: '/reels/reel-1.mp4', caption: 'Exploring the city streets!', audio: { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' }, likes: 12400, comments: 345, shares: 123 },
    { id: 'r-2', user: users[2], videoUrl: '/reels/reel-2.mp4', caption: 'Morning coffee routine.', audio: { title: 'Sunday Best', artist: 'Surfaces' }, likes: 8900, comments: 210, shares: 98 },
];

export const trendingTopics: TrendingTopic[] = [
    { tag: 'TechEvent2024', posts: 12500, imageUrl: '/trending/tech.jpg' },
    { tag: 'SummerVibes', posts: 88700, imageUrl: '/trending/summer.jpg' },
];

export const loginActivity: LoginActivity[] = [
    { id: 'la-1', device: 'Chrome on macOS', location: 'San Francisco, CA', ipAddress: '192.168.1.1', isCurrent: true },
    { id: 'la-2', device: 'Nexus App on iPhone 15', location: 'New York, NY', ipAddress: '10.0.0.1', isCurrent: false },
];
