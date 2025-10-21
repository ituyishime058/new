import { User, Post, Comment, Story, Notification, Conversation, Reel, Poll, Highlight, LoginActivity } from './types';

// Current User
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Cooper',
  handle: 'alexcooper',
  avatarUrl: '/avatars/alex.jpg',
  isOnline: true,
  bio: 'Frontend Developer | React & TypeScript enthusiast 🚀 | Exploring the web, one component at a time.',
  followers: 1258,
  following: 342,
};

export const nexusAiUser: User = {
    id: 'nexus-ai',
    name: 'Nexus AI',
    handle: 'nexus_ai',
    avatarUrl: '/avatars/ai.png',
    isOnline: true,
    bio: 'Your friendly and helpful AI assistant, powered by Google Gemini.'
};

// Other Users
export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Samantha Bee', handle: 'samanthab', avatarUrl: '/avatars/samantha.jpg', isOnline: true, isFollowing: true },
  { id: 'user-3', name: 'John Smith', handle: 'johnsmith', avatarUrl: '/avatars/john.jpg', isOnline: false, isFollowing: true },
  { id: 'user-4', name: 'Maria Garcia', handle: 'mariag', avatarUrl: '/avatars/maria.jpg', isOnline: true, isFollowing: false },
  { id: 'user-5', name: 'David Chen', handle: 'davidchen', avatarUrl: '/avatars/david.jpg', isOnline: false, isFollowing: true },
  { id: 'user-6', name: 'Emily White', handle: 'emilyw', avatarUrl: '/avatars/emily.jpg', isOnline: true, isFollowing: false },
  nexusAiUser,
];

// Comments
export const comments: Comment[] = [
  { id: 'comment-1', user: users[1], text: 'This looks amazing! 😍', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'comment-2', user: users[2], text: 'Great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 'comment-3', user: users[3], text: 'React is still my go-to!', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 'comment-4', user: users[4], text: 'Love this!', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
  { id: 'comment-5', user: users[5], text: 'So cool!', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
];

const sampleComments: Comment[] = comments.slice(0, 2);

const poll1: Poll = {
  id: 'poll-1',
  question: 'What should be the next feature?',
  options: [
    { id: 'opt-1', text: 'Dark Mode Enhancements', votes: 120 },
    { id: 'opt-2', text: 'Real-time Chat Reactions', votes: 250 },
    { id: 'opt-3', text: 'Advanced Search Filters', votes: 85 }
  ]
}

// Posts
export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just enjoying a beautiful sunset at the beach. Nature is the best artist! 🌅',
    imageUrl: '/posts/sunset.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 152,
    comments: sampleComments,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'My new workspace setup is finally complete! What do you guys think? #workfromhome #desksetup',
    imageUrl: '/posts/setup.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 320,
    comments: [],
  },
   {
    id: 'post-3',
    author: currentUser,
    content: 'Which JS framework do you prefer for new projects in 2024?',
    poll: poll1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 98,
    comments: [
      { id: 'comment-3', user: users[3], text: 'React is still my go-to!', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    ],
  },
  {
    id: 'post-4',
    author: users[3],
    content: 'Exploring the city streets and found this hidden gem of a cafe. ☕️',
    imageUrl: '/posts/cafe.jpg',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 88,
    comments: [],
  },
];

// Stories
export const stories: Story[] = [
    { id: 'story-1', user: users[1], imageUrl: '/stories/story1.jpg', timestamp: new Date().toISOString(), duration: 5000 },
    { id: 'story-2', user: users[2], imageUrl: '/stories/story2.jpg', timestamp: new Date().toISOString(), duration: 5000 },
    { id: 'story-3', user: users[3], imageUrl: '/stories/story3.jpg', timestamp: new Date().toISOString(), duration: 5000 },
    { id: 'story-4', user: users[4], imageUrl: '/stories/story4.jpg', timestamp: new Date().toISOString(), duration: 5000 },
    { id: 'story-5', user: users[5], imageUrl: '/stories/story5.jpg', timestamp: new Date().toISOString(), duration: 5000 },
];

// Notifications
export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[2], post: posts[0], read: false, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    { id: 'notif-2', type: 'follow', user: users[3], read: false, timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { id: 'notif-3', type: 'comment', user: users[1], post: posts[0], read: true, timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
];

// Conversations
export const conversations: Conversation[] = [
    {
        id: 'convo-ai',
        user: nexusAiUser,
        unreadCount: 0,
        messages: [
            { id: 'ai-msg-1', sender: nexusAiUser, text: 'Hello! I am Nexus AI. How can I assist you today?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
        ]
    },
    {
        id: 'convo-1',
        user: users[1],
        unreadCount: 2,
        messages: [
            { id: 'msg-1', sender: users[1], text: 'Hey! Are you coming to the meetup tomorrow?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), read: false },
            { id: 'msg-2', sender: users[1], text: 'Let me know!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(), read: false },
        ]
    },
    {
        id: 'convo-2',
        user: users[3],
        unreadCount: 0,
        messages: [
            { id: 'msg-3', sender: currentUser, text: 'The photos from your trip look amazing!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
            { id: 'msg-4', sender: users[3], text: 'Thanks! It was a great trip.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
        ]
    }
];

// Reels
export const reels: Reel[] = [
    { id: 'reel-1', user: users[4], videoUrl: '/reels/reel1.mp4', caption: 'Summer vibes only ☀️ #summer #travel', likes: 12345, comments: 245, shares: 102, audio: { title: 'Good Times', artist: 'Upbeat Music' } },
    { id: 'reel-2', user: users[5], videoUrl: '/reels/reel2.mp4', caption: 'Cooking up a storm in the kitchen! 🍳 #cooking #recipe', likes: 8765, comments: 189, shares: 76, audio: { title: 'Kitchen Beats', artist: 'Lo-fi Chef' } },
];

// Trending Topics
export const trendingTopics = [
    { tag: 'TechInnovation', posts: 243_000, imageUrl: '/trending/tech.jpg' },
    { tag: 'Summer2024', posts: 1_200_000, imageUrl: '/trending/summer.jpg' },
    { tag: 'HealthyLiving', posts: 78_000, imageUrl: '/trending/health.jpg' },
];

// Highlights
export const highlights: Highlight[] = [
    { id: 'hl-1', title: 'Travel', coverImageUrl: '/highlights/travel.jpg', stories: stories.slice(0,2) },
    { id: 'hl-2', title: 'Food', coverImageUrl: '/highlights/food.jpg', stories: stories.slice(2,4) },
    { id: 'hl-3', title: 'Projects', coverImageUrl: '/highlights/projects.jpg', stories: stories.slice(4,5) },
];

export const loginActivity: LoginActivity[] = [
    { id: 'la-1', device: 'Chrome on Windows', location: 'New York, NY', ipAddress: '192.168.1.1', timestamp: new Date().toISOString(), isCurrent: true },
    { id: 'la-2', device: 'Nexus App on iPhone 15', location: 'New York, NY', ipAddress: '192.168.1.2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isCurrent: false },
    { id: 'la-3', device: 'Safari on MacBook Pro', location: 'Boston, MA', ipAddress: '192.168.1.3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), isCurrent: false },
