import { User, Post, Comment, Notification, Conversation, Message, Story, Reel, Highlight, LoginActivity } from './types.ts';

// USERS
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  handle: 'alexj',
  avatarUrl: '/avatars/alex.jpg',
  isOnline: true,
  followers: 1258,
  following: 320,
  bio: 'Frontend Developer | Coffee Enthusiast ☕️ | Building cool things for the web.',
  isFollowing: false,
};

export const nexusAiUser: User = {
  id: 'user-ai',
  name: 'Nexus AI',
  handle: 'nexusai',
  avatarUrl: '/avatars/ai.png',
};


export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Brianna Smith', handle: 'bsmith', avatarUrl: '/avatars/brianna.jpg', isOnline: true, isFollowing: true },
  { id: 'user-3', name: 'Carlos Gomez', handle: 'carlosg', avatarUrl: '/avatars/carlos.jpg', isOnline: false, isFollowing: true },
  { id: 'user-4', name: 'Diana Prince', handle: 'diana', avatarUrl: '/avatars/diana.jpg', isOnline: true, isFollowing: false },
  { id: 'user-5', name: 'Ethan Hunt', handle: 'ethanh', avatarUrl: '/avatars/ethan.jpg', isOnline: false, isFollowing: true },
  { id: 'user-6', name: 'Fiona Glenanne', handle: 'fiona', avatarUrl: '/avatars/fiona.jpg', isOnline: true, isFollowing: false },
];

// COMMENTS
export const comments: Comment[] = [
    { id: 'comment-1', user: users[2], text: "This is awesome!", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'comment-2', user: users[3], text: "Great point, never thought of it that way.", timestamp: new Date(Date.now() - 7200000).toISOString() },
];

// POSTS
export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just deployed a new feature on our project! Feeling accomplished. #webdev #react @alexj',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    likes: 128,
    comments: comments,
    imageUrl: '/posts/post-1.jpg',
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'Morning hike views were incredible today! ☀️ #nature #hiking',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    likes: 256,
    comments: [],
    imageUrl: '/posts/post-2.jpg',
  },
  {
    id: 'post-3',
    author: currentUser,
    content: 'Which color scheme do you prefer for the new dashboard?',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    likes: 50,
    comments: [],
    isBookmarked: true,
    poll: {
      id: 'poll-1',
      question: 'Which color scheme?',
      options: [
        { id: 'opt-1', text: 'Blue & White', votes: 22 },
        { id: 'opt-2', text: 'Dark Mode', votes: 89 },
        { id: 'opt-3', text: 'Green & Cream', votes: 14 },
      ]
    }
  },
   {
    id: 'post-4',
    author: users[4],
    content: 'Exploring the city streets and found this hidden gem of a cafe. ☕️ #citylife #coffee',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    likes: 98,
    comments: [],
    imageUrl: '/posts/post-3.jpg',
  },
];

// NOTIFICATIONS
export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[1], timestamp: new Date(Date.now() - 3600000).toISOString(), read: false, post: posts[2] },
    { id: 'notif-2', type: 'comment', user: users[2], timestamp: new Date(Date.now() - 7200000).toISOString(), read: false, post: posts[2] },
    { id: 'notif-3', type: 'follow', user: users[3], timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
];

// MESSAGES & CONVERSATIONS
export const messages: Message[] = [
    { id: 'msg-1', sender: users[1], text: 'Hey, did you see the project update?', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: true },
    { id: 'msg-2', sender: currentUser, text: 'Yeah, I just saw it. Looks great!', timestamp: new Date(Date.now() - 3540000).toISOString(), isRead: true },
    { id: 'msg-3', sender: users[1], text: 'Awesome! Let\'s sync up tomorrow morning about it.', timestamp: new Date(Date.now() - 3480000).toISOString(), isRead: false },
    { id: 'msg-4', sender: currentUser, text: 'Sounds good. 10 AM?', timestamp: new Date(Date.now() - 3420000).toISOString(), isRead: false },
];

export const conversations: Conversation[] = [
    { id: 'conv-1', user: users[1], messages: messages, unreadCount: 2, isPinned: true, isMuted: false },
    { id: 'conv-2', user: users[2], messages: [{ id: 'msg-5', sender: users[2], text: 'Can you review my PR?', timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: true }], unreadCount: 0, isPinned: false, isMuted: false },
    { id: 'conv-3', user: users[3], messages: [{ id: 'msg-6', sender: users[3], text: 'Lunch today?', timestamp: new Date(Date.now() - 172800000).toISOString(), isRead: true }], unreadCount: 0, isPinned: false, isMuted: true },
    {
      id: 'conv-4',
      isGroup: true,
      groupName: 'Project Team',
      participants: [currentUser, users[1], users[4]],
      messages: [{ id: 'msg-7', sender: users[4], text: 'Meeting moved to 3 PM.', timestamp: new Date(Date.now() - 7200000).toISOString(), isRead: true }],
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      user: { id: 'group-1', name: 'Project Team', handle: 'project-team', avatarUrl: '/avatars/group-1.png' }
    },
];

// STORIES
export const stories: Story[] = [
    { id: 'story-1', user: currentUser, imageUrl: '/stories/story-1.jpg', timestamp: new Date(Date.now() - 3600000).toISOString(), duration: 15, isSeen: true },
    { id: 'story-2', user: users[1], imageUrl: '/stories/story-2.jpg', timestamp: new Date(Date.now() - 7200000).toISOString(), duration: 10, isSeen: false },
    { id: 'story-3', user: users[2], imageUrl: '/stories/story-3.jpg', timestamp: new Date(Date.now() - 10800000).toISOString(), duration: 20, isSeen: false },
    { id: 'story-4', user: users[4], imageUrl: '/stories/story-4.jpg', timestamp: new Date(Date.now() - 14400000).toISOString(), duration: 12, isSeen: false },
];

// REELS
export const reels: Reel[] = [
    { id: 'reel-1', user: users[3], videoUrl: '/reels/reel-1.mp4', caption: 'Unbelievable drone shots from my last trip! #travel #drone', audio: { title: 'Upbeat Funk', artist: 'StockAudio' }, likes: 12345, comments: 678, shares: 910 },
    { id: 'reel-2', user: users[4], videoUrl: '/reels/reel-2.mp4', caption: 'My morning coffee routine ☕️', audio: { title: 'Chill Lo-fi', artist: 'BeatMaker' }, likes: 5432, comments: 123, shares: 45 },
];

// HIGHLIGHTS
export const highlights: Highlight[] = [
    { id: 'hl-1', title: 'Travel', coverImageUrl: '/highlights/travel.jpg' },
    { id: 'hl-2', title: 'Foodie', coverImageUrl: '/highlights/food.jpg' },
    { id: 'hl-3', title: 'Projects', coverImageUrl: '/highlights/projects.jpg' },
];

// TRENDING
export const trendingTopics = [
  { tag: 'TechEvent2024', posts: 12500, imageUrl: '/trending/tech.jpg' },
  { tag: 'SummerVibes', posts: 98000, imageUrl: '/trending/summer.jpg' },
  { tag: 'NewMusicFriday', posts: 42300, imageUrl: '/trending/music.jpg' },
];

// SECURITY
export const loginActivity: LoginActivity[] = [
    { id: 'la-1', device: 'Chrome on macOS', location: 'New York, NY', ipAddress: '192.168.1.1', isCurrent: true },
    { id: 'la-2', device: 'Nexus App on iOS', location: 'New York, NY', ipAddress: '192.168.1.1', isCurrent: false },
];
