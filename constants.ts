
import { User, Post, Comment, Story, Conversation, Message, Reel, Notification, Highlight, TrendingTopic, LoginActivity } from './types.ts';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  handle: 'alexj',
  avatarUrl: '/avatars/alex.jpg',
  isOnline: true,
  bio: 'Frontend Developer | Coffee enthusiast ☕ | Building cool things on the web.',
  followers: 1258,
  following: 342,
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
  { id: 'user-2', name: 'Maria Garcia', handle: 'mariag', avatarUrl: '/avatars/maria.jpg', isOnline: true, isFollowing: true },
  { id: 'user-3', name: 'Kenji Tanaka', handle: 'kenjit', avatarUrl: '/avatars/kenji.jpg', isOnline: false, isFollowing: false },
  { id: 'user-4', name: 'Fatima Ahmed', handle: 'fatimaa', avatarUrl: '/avatars/fatima.jpg', isOnline: true, isFollowing: true },
  { id: 'user-5', name: 'Leo Carter', handle: 'leoc', avatarUrl: '/avatars/leo.jpg', isOnline: false, isFollowing: false },
  { id: 'user-6', name: 'Chloe Kim', handle: 'chloek', avatarUrl: '/avatars/chloe.jpg', isOnline: true, isFollowing: false },
];

export const comments: Comment[] = [
  { id: 'comment-1', user: users[2], text: 'This is amazing! Great shot.', timestamp: '2024-07-22T10:30:00Z' },
  { id: 'comment-2', user: users[3], text: 'Love the color palette.', timestamp: '2024-07-22T10:32:00Z' },
  { id: 'comment-3', user: users[1], text: 'Where was this taken?', timestamp: '2024-07-22T10:35:00Z' },
];

export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Exploring the beautiful city of Kyoto! 🏯 The temples, the gardens, the food... everything is just perfect. #Kyoto #Japan #Travel',
    timestamp: '2024-07-22T10:00:00Z',
    likes: 128,
    comments: comments,
    imageUrl: '/posts/kyoto.jpg',
    isBookmarked: true,
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'Just finished a new 3D model. What do you guys think of this character design? Any feedback is welcome! @mariag what do you think? #3DArt #Blender #CharacterDesign',
    timestamp: '2024-07-22T09:15:00Z',
    likes: 256,
    comments: [],
    imageUrl: '/posts/3d-model.jpg',
  },
  {
    id: 'post-3',
    author: users[4],
    content: 'Which laptop is better for programming in 2024?',
    timestamp: '2024-07-21T18:45:00Z',
    likes: 78,
    comments: [],
    poll: {
      question: 'Which laptop is better for programming?',
      options: [
        { id: 'opt-1', text: 'MacBook Pro M3', votes: 152 },
        { id: 'opt-2', text: 'Dell XPS 15', votes: 89 },
        { id: 'opt-3', text: 'ThinkPad X1 Carbon', votes: 64 },
      ]
    }
  },
  {
    id: 'post-4',
    author: users[3],
    content: 'My new article on "The Future of AI in UX Design" is out now! Check it out and let me know your thoughts. #AI #UX #DesignThinking',
    timestamp: '2024-07-21T15:20:00Z',
    likes: 92,
    comments: [],
  },
];

export const stories: Story[] = [
  { id: 'story-1', user: currentUser, imageUrl: '/stories/alex-story.jpg', timestamp: '2024-07-22T11:00:00Z', duration: 5 },
  { id: 'story-2', user: users[1], imageUrl: '/stories/maria-story.jpg', timestamp: '2024-07-22T10:45:00Z', duration: 7 },
  { id: 'story-3', user: users[2], imageUrl: '/stories/kenji-story.jpg', timestamp: '2024-07-22T10:30:00Z', duration: 6 },
  { id: 'story-4', user: users[3], imageUrl: '/stories/fatima-story.jpg', timestamp: '2024-07-22T09:00:00Z', duration: 8 },
  { id: 'story-5', user: users[4], imageUrl: '/stories/leo-story.jpg', timestamp: '2024-07-22T08:15:00Z', duration: 5 },
];

export const highlights: Highlight[] = [
    { id: 'hl-1', title: 'Travel', coverImageUrl: '/highlights/travel.jpg', stories: [] },
    { id: 'hl-2', title: 'Food', coverImageUrl: '/highlights/food.jpg', stories: [] },
    { id: 'hl-3', title: 'Projects', coverImageUrl: '/highlights/projects.jpg', stories: [] },
    { id: 'hl-4', title: 'Friends', coverImageUrl: '/highlights/friends.jpg', stories: [] },
];

const messages: Message[] = [
    { id: 'm-1', sender: users[1], text: 'Hey, how are you?', timestamp: '2024-07-22T12:00:00Z', read: false },
    { id: 'm-2', sender: currentUser, text: 'I am good, thanks for asking! Just working on a new project. What about you?', timestamp: '2024-07-22T12:01:00Z', read: true },
    { id: 'm-3', sender: users[1], text: 'Sounds exciting! I am planning a trip to Italy. Any recommendations?', timestamp: '2024-07-22T12:02:00Z', read: false },
];

export const conversations: Conversation[] = [
  { id: 'conv-ai', user: nexusAiUser, messages: [{ id: 'ai-m1', sender: nexusAiUser, text: "Hello! I'm Nexus AI. How can I help you today?", timestamp: '2024-07-22T11:00:00Z', read: true}], unreadCount: 0 },
  { id: 'conv-1', user: users[1], messages: messages, unreadCount: 2 },
  { id: 'conv-2', user: users[2], messages: [{ id: 'c2-m1', sender: users[2], text: 'Can you check out my new design?', timestamp: '2024-07-21T15:00:00Z', read: true}], unreadCount: 0 },
  { id: 'conv-3', user: users[3], messages: [{ id: 'c3-m1', sender: currentUser, text: 'The article was great!', timestamp: '2024-07-21T18:00:00Z', read: true}], unreadCount: 0 },
];

export const reels: Reel[] = [
    { id: 'reel-1', user: users[5], videoUrl: '/reels/reel1.mp4', caption: 'Amazing drone shots from the mountains!', audio: { title: 'Adventure', artist: 'Cinematic Orchestra' }, likes: 12500, comments: 342, shares: 129 },
    { id: 'reel-2', user: users[3], videoUrl: '/reels/reel2.mp4', caption: 'Cooking up a storm today! #chefmode', audio: { title: 'Sunny Day', artist: 'Upbeat Pop' }, likes: 8900, comments: 210, shares: 98 },
    { id: 'reel-3', user: users[1], videoUrl: '/reels/reel3.mp4', caption: 'My morning workout routine 💪', audio: { title: 'Power Up', artist: 'Workout Mix' }, likes: 23100, comments: 889, shares: 451 },
];

export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[2], post: posts[0], timestamp: '2024-07-22T11:05:00Z', read: false },
    { id: 'notif-2', type: 'follow', user: users[4], timestamp: '2024-07-22T10:50:00Z', read: false },
    { id: 'notif-3', type: 'comment', user: users[1], post: posts[0], timestamp: '2024-07-22T10:35:00Z', read: true },
    { id: 'notif-4', type: 'like', user: users[3], post: posts[1], timestamp: '2024-07-22T09:45:00Z', read: true },
];

export const trendingTopics: TrendingTopic[] = [
    { tag: 'TechInnovation', posts: 45200, imageUrl: '/trends/tech.jpg' },
    { tag: 'SummerVibes', posts: 128000, imageUrl: '/trends/summer.jpg' },
    { tag: 'WorldOfArt', posts: 89300, imageUrl: '/trends/art.jpg' },
];

export const loginActivity: LoginActivity[] = [
    { id: 'la-1', device: 'Chrome on macOS', location: 'San Francisco, US', ipAddress: '192.168.1.1', timestamp: new Date().toISOString(), isCurrent: true },
    { id: 'la-2', device: 'Nexus App on iPhone 15', location: 'New York, US', ipAddress: '10.0.0.1', timestamp: '2024-07-21T14:30:00Z', isCurrent: false },
];
