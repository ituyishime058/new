
import { User, Post, Comment, Story, Highlight, Conversation, Notification, Reel, LoginActivity, PollOption, Poll } from './types.ts';

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  handle: 'you',
  avatarUrl: '/avatars/avatar-1.jpg',
  bio: 'Just a user trying to figure out this app. Frontend Engineer. Love React and TypeScript.',
  followers: 1250,
  following: 320,
};

export const nexusAiUser: User = {
  id: 'user-ai',
  name: 'Nexus AI',
  handle: 'nexusai',
  avatarUrl: '/avatars/avatar-ai.png',
  bio: 'Your friendly neighborhood AI assistant, powered by Gemini.',
};


export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Jane Doe',
    handle: 'janedoe',
    avatarUrl: '/avatars/avatar-2.jpg',
    isOnline: true,
    isFollowing: true,
  },
  {
    id: 'user-3',
    name: 'John Smith',
    handle: 'johnsmith',
    avatarUrl: '/avatars/avatar-3.jpg',
    isOnline: false,
    isFollowing: true,
  },
  {
    id: 'user-4',
    name: 'Emily Jones',
    handle: 'emilyjones',
    avatarUrl: '/avatars/avatar-4.jpg',
    isOnline: true,
    isFollowing: false,
  },
  {
    id: 'user-5',
    name: 'Michael Brown',
    handle: 'michaelbrown',
    avatarUrl: '/avatars/avatar-5.jpg',
    isOnline: false,
    isFollowing: true,
  },
   {
    id: 'user-6',
    name: 'Sarah Miller',
    handle: 'sarahmiller',
    avatarUrl: '/avatars/avatar-6.jpg',
    isOnline: true,
    isFollowing: false,
  },
];

export const comments: Comment[] = [
  {
    id: 'comment-1',
    user: users[1],
    text: 'This is amazing!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'comment-2',
    user: users[2],
    text: 'Great post!',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'comment-3',
    user: users[3],
    text: 'I totally agree with this.',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
];

const pollOptions1: PollOption[] = [
    { id: 'poll-1-opt-1', text: 'React', votes: 120 },
    { id: 'poll-1-opt-2', text: 'Vue', votes: 65 },
    { id: 'poll-1-opt-3', text: 'Svelte', votes: 45 },
    { id: 'poll-1-opt-4', text: 'Angular', votes: 30 },
];
const poll1: Poll = { id: 'poll-1', question: 'Which frontend framework is your favorite?', options: pollOptions1 };


export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just enjoying a beautiful sunset. #nature #sunset',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    likes: 128,
    comments: comments.slice(0,2),
    imageUrl: '/posts/post-1.jpg',
    isBookmarked: true,
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'What is everyone building this weekend? I\'m working on a new side project with @you. #coding #devlife',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 256,
    comments: [comments[2]],
  },
  {
    id: 'post-3',
    author: users[3],
    content: 'My new setup is finally complete! What do you think?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 512,
    comments: [],
    imageUrl: '/posts/post-2.jpg',
  },
   {
    id: 'post-4',
    author: users[4],
    content: 'Let\'s settle this! Which frontend framework do you prefer?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 480,
    comments: [],
    poll: poll1,
    isBookmarked: true,
  },
];

export const stories: Story[] = [
    { id: 'story-1', user: currentUser, imageUrl: '/stories/story-1.jpg', timestamp: new Date().toISOString(), duration: 10 },
    { id: 'story-2', user: users[1], imageUrl: '/stories/story-2.jpg', timestamp: new Date().toISOString(), duration: 10 },
    { id: 'story-3', user: users[2], imageUrl: '/stories/story-3.jpg', timestamp: new Date().toISOString(), duration: 10 },
    { id: 'story-4', user: users[3], imageUrl: '/stories/story-4.jpg', timestamp: new Date().toISOString(), duration: 10 },
    { id: 'story-5', user: users[4], imageUrl: '/stories/story-5.jpg', timestamp: new Date().toISOString(), duration: 10 },
    { id: 'story-6', user: users[5], imageUrl: '/stories/story-6.jpg', timestamp: new Date().toISOString(), duration: 10 },
];

export const highlights: Highlight[] = [
    { id: 'highlight-1', title: 'Travel', coverImageUrl: '/highlights/highlight-1.jpg', stories: stories.slice(0, 2) },
    { id: 'highlight-2', title: 'Food', coverImageUrl: '/highlights/highlight-2.jpg', stories: [stories[2]] },
    { id: 'highlight-3', title: 'Projects', coverImageUrl: '/highlights/highlight-3.jpg', stories: stories.slice(3, 5) },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-ai',
    user: nexusAiUser,
    unreadCount: 0,
    messages: [
      { id: 'msg-ai-1', sender: nexusAiUser, text: 'Hello! I am Nexus AI. How can I help you today?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
    ]
  },
  {
    id: 'convo-1',
    user: users[1],
    unreadCount: 2,
    messages: [
      { id: 'msg-1-1', sender: users[1], text: 'Hey, did you see the latest news?', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: true },
      { id: 'msg-1-2', sender: currentUser, text: 'No, what happened?', timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(), read: true },
      { id: 'msg-1-3', sender: users[1], text: 'Check out the tech channel!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
    ]
  },
  {
    id: 'convo-2',
    user: users[3],
    unreadCount: 0,
    messages: [
      { id: 'msg-2-1', sender: currentUser, text: 'Thanks for the help on that project!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
    ]
  }
];

export const notifications: Notification[] = [
  { id: 'notif-1', type: 'like', user: users[2], post: { id: 'post-1', content: 'Just enjoying a beautiful sunset. #nature #sunset' }, timestamp: new Date().toISOString(), read: false },
  { id: 'notif-2', type: 'follow', user: users[4], timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), read: false },
  { id: 'notif-3', type: 'comment', user: users[1], post: { id: 'post-2', content: 'What is everyone building this weekend?' }, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), read: true },
];

export const reels: Reel[] = [
    { id: 'reel-1', user: users[1], videoUrl: '/reels/reel-1.mp4', caption: 'Amazing drone shots!', audio: { title: 'Upbeat Funk', artist: 'StockAudio' }, likes: 12345, comments: 245, shares: 123 },
    { id: 'reel-2', user: users[3], videoUrl: '/reels/reel-2.mp4', caption: 'Cooking up a storm', audio: { title: 'Chill Lo-fi', artist: 'BeatMaster' }, likes: 5432, comments: 180, shares: 98 },
    { id: 'reel-3', user: users[4], videoUrl: '/reels/reel-3.mp4', caption: 'My morning routine', audio: { title: 'Acoustic Sunrise', artist: 'IndieFolk' }, likes: 8765, comments: 312, shares: 210 },
];

export const loginActivity: LoginActivity[] = [
    { id: 'log-1', device: 'Chrome on macOS', location: 'San Francisco, CA', ipAddress: '192.168.1.1', timestamp: new Date().toISOString(), isCurrent: true },
    { id: 'log-2', device: 'Nexus App on iPhone 15', location: 'New York, NY', ipAddress: '10.0.0.1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), isCurrent: false },
];

export const trendingTopics = [
    { tag: 'Tech', posts: 125000, imageUrl: '/trending/tech.jpg' },
    { tag: 'Photography', posts: 89000, imageUrl: '/trending/photography.jpg' },
    { tag: 'Gaming', posts: 250000, imageUrl: '/trending/gaming.jpg' },
];
