import { User, Post, Comment as CommentType, Story, Conversation, Notification, Reel } from './types';

// Current User
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Ray',
  handle: 'alexray',
  avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
  bio: 'Just a user of this awesome app!',
  followers: 123,
  following: 456,
  highlights: [
    { id: 'h1', title: 'Travel', coverUrl: 'https://picsum.photos/seed/h1/200/300' },
    { id: 'h2', title: 'Food', coverUrl: 'https://picsum.photos/seed/h2/200/300' },
    { id: 'h3', title: 'Pets', coverUrl: 'https://picsum.photos/seed/h3/200/300' },
  ],
  isVerified: true,
  isOnline: true,
};

// AI User
export const nexusAiUser: User = {
    id: 'nexus-ai',
    name: 'Nexus AI',
    handle: 'nexusai',
    avatarUrl: '/nexus-ai-avatar.png',
    bio: 'Your friendly AI assistant, powered by Gemini.',
    isVerified: true,
};

// Users
export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Jane Doe', handle: 'janedoe', avatarUrl: 'https://i.pravatar.cc/150?u=user-2', bio: 'Frontend Developer | React Enthusiast', isFollowing: true, isVerified: true, isOnline: true },
  { id: 'user-3', name: 'John Smith', handle: 'johnsmith', avatarUrl: 'https://i.pravatar.cc/150?u=user-3', bio: 'Designer and Photographer', isFollowing: false, isOnline: false },
  { id: 'user-4', name: 'Emily White', handle: 'emilyw', avatarUrl: 'https://i.pravatar.cc/150?u=user-4', bio: 'Lover of coffee and code.', isFollowing: true, isOnline: true },
  { id: 'user-5', name: 'Michael Brown', handle: 'mikeb', avatarUrl: 'https://i.pravatar.cc/150?u=user-5', bio: 'Exploring the world one step at a time.', isFollowing: false, isOnline: false },
  { id: 'user-6', name: 'Sarah Wilson', handle: 'sarahw', avatarUrl: 'https://i.pravatar.cc/150?u=user-6', bio: 'Musician and artist.', isFollowing: false, isOnline: true },
  { id: 'user-7', name: 'David Lee', handle: 'davidl', avatarUrl: 'https://i.pravatar.cc/150?u=user-7', bio: 'Tech blogger and vlogger.', isFollowing: true, isOnline: false },
  nexusAiUser,
];

// Comments
export const sampleComments: CommentType[] = [
    { id: 'comment-1', user: users[1], text: 'This is amazing!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'comment-2', user: users[2], text: 'Great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { id: 'comment-3', user: users[3], text: 'Wow, I love this.', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
];

// Posts
export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just enjoying a beautiful sunset. What a view! #sunset #nature',
    imageUrl: 'https://picsum.photos/seed/post1/600/400',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 152,
    comments: sampleComments.slice(0, 2),
    isLiked: true,
    isBookmarked: true,
    reactions: { '❤️': 101, '👍': 51 },
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'Check out this new design I\'m working on. Feedback is welcome! @janedoe what do you think?',
    imageUrl: 'https://picsum.photos/seed/post2/600/600',
    timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString(),
    likes: 34,
    comments: [sampleComments[2]],
    isLiked: false,
    isBookmarked: false,
    reactions: { '👍': 34 },
  },
  {
    id: 'post-3',
    author: users[3],
    content: 'My new puppy is the cutest! 🐶❤️',
    imageUrl: 'https://picsum.photos/seed/post3/400/500',
    timestamp: new Date(Date.now() - 1000 * 3600 * 8).toISOString(),
    likes: 541,
    comments: [],
    isLiked: false,
    isBookmarked: true,
    reactions: { '❤️': 541 },
  },
   {
    id: 'post-4',
    author: users[4],
    content: 'Which one for the weekend?',
    poll: {
      id: 'poll-1',
      question: 'Weekend activity?',
      options: [
        { id: 'opt-1', text: 'Beach Day 🏖️', votes: 42 },
        { id: 'opt-2', text: 'Mountain Hike ⛰️', votes: 58 },
        { id: 'opt-3', text: 'Movie Marathon 🍿', votes: 23 },
      ],
    },
    timestamp: new Date(Date.now() - 1000 * 3600 * 24).toISOString(),
    likes: 78,
    comments: [],
    isLiked: false,
    isBookmarked: false,
    reactions: { '👍': 78 },
  },
];

// Stories
export const stories: Story[] = [
    { id: 'story-1', user: users[1], imageUrl: 'https://picsum.photos/seed/story1/1080/1920', duration: 5000, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'story-2', user: users[2], imageUrl: 'https://picsum.photos/seed/story2/1080/1920', duration: 7000, timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
    { id: 'story-3', user: users[3], imageUrl: 'https://picsum.photos/seed/story3/1080/1920', duration: 4000, timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    { id: 'story-4', user: users[4], imageUrl: 'https://picsum.photos/seed/story4/1080/1920', duration: 6000, timestamp: new Date(Date.now() - 1000 * 3600).toISOString() },
];

const conversation1Messages = [
    { id: 'm-1-1', sender: users[1], text: 'Hey, are we still on for lunch tomorrow?', timestamp: new Date(Date.now() - 1000 * 3600 * 2).toISOString(), read: false },
    { id: 'm-1-2', sender: currentUser, text: 'Yes, absolutely! See you at 12:30.', timestamp: new Date(Date.now() - 1000 * 3600 * 1).toISOString(), read: true },
    { id: 'm-1-3', sender: users[1], text: 'Great! Looking forward to it.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
];

// FIX: To resolve the "used before declaration" error, the message being replied to is defined first.
const repliedMessageConv2 = { id: 'm-2-2', sender: currentUser, text: 'Sure, I just sent them over to your email.', timestamp: new Date(Date.now() - 1000 * 3600 * 23).toISOString(), read: true };
const conversation2Messages = [
     { id: 'm-2-1', sender: users[2], text: 'Can you send me the files for the project?', timestamp: new Date(Date.now() - 1000 * 3600 * 24).toISOString(), read: true },
      repliedMessageConv2,
      { id: 'm-2-3', sender: currentUser, attachment: { type: 'file', url: '#', fileName: 'project-brief.pdf', fileSize: '2.3 MB' }, text: '', timestamp: new Date(Date.now() - 1000 * 3600 * 22).toISOString(), read: true },
      { id: 'm-2-4', sender: users[2], text: 'Got it, thanks!', timestamp: new Date(Date.now() - 1000 * 3600 * 21).toISOString(), read: true, replyTo: repliedMessageConv2 },
      { id: 'm-2-5', sender: currentUser, voiceNote: { url: '#', duration: 15 }, text: '', timestamp: new Date(Date.now() - 1000 * 3600 * 20).toISOString(), read: true },
];

// Conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-ai',
    user: nexusAiUser,
    messages: [
      { id: 'm-ai-1', sender: nexusAiUser, text: 'Hello! How can I help you today? You can ask me to generate text, edit images, and much more.', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), read: true },
    ],
    unreadCount: 0,
  },
  {
    id: 'conv-1',
    user: users[1],
    messages: conversation1Messages,
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    user: users[2],
    messages: conversation2Messages,
    unreadCount: 0,
  }
];

// Notifications
export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[2], post: { content: 'Check out this new design I\'m working on...' }, read: false, timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'notif-2', type: 'comment', user: users[1], post: { content: 'Just enjoying a beautiful sunset...' }, read: false, timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
    { id: 'notif-3', type: 'follow', user: users[3], read: true, timestamp: new Date(Date.now() - 1000 * 3600 * 3).toISOString() },
    { id: 'notif-4', type: 'like', user: users[4], post: { content: 'My new puppy is the cutest! 🐶❤️' }, read: true, timestamp: new Date(Date.now() - 1000 * 3600 * 24).toISOString() },
];

// Reels
export const reels: Reel[] = [
    { id: 'reel-1', user: users[1], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', caption: 'Having a blast!', audio: { title: 'Upbeat Funk', artist: 'StockMusic' }, likes: 1234, comments: 56, shares: 12 },
    { id: 'reel-2', user: users[2], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', caption: 'Art in motion.', audio: { title: 'Chill Lo-fi', artist: 'BeatMaker' }, likes: 5678, comments: 123, shares: 45 },
    { id: 'reel-3', user: users[3], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', caption: 'Exploring new places!', audio: { title: 'Acoustic Journey', artist: 'IndieFolk' }, likes: 9101, comments: 234, shares: 67 },
];

export const trendingTopics = [
    { tag: 'WebDevelopment', posts: 1250, imageUrl: 'https://picsum.photos/seed/wd/400/200' },
    { tag: 'UIUX', posts: 980, imageUrl: 'https://picsum.photos/seed/uiux/400/200' },
    { tag: 'ReactJS', posts: 2300, imageUrl: 'https://picsum.photos/seed/react/400/200' },
    { tag: 'TailwindCSS', posts: 750, imageUrl: 'https://picsum.photos/seed/tailwind/400/200' },
    { tag: 'GeminiAI', posts: 1500, imageUrl: 'https://picsum.photos/seed/gemini/400/200' },
];