
import { User, Post, Comment, Story, Highlight, Notification, Conversation, Message, Reel } from './types';

// USERS
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  handle: 'alexj',
  avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  bio: 'Frontend Developer | React Enthusiast | Coffee Lover ☕',
  followers: 1258,
  following: 342,
};

export const nexusAiUser: User = {
    id: 'ai-assistant',
    name: 'Nexus AI',
    handle: 'nexusai',
    avatarUrl: '/assets/ai-avatar.png', // You'll need to create or find an avatar for the AI
    bio: 'Your friendly and helpful AI assistant. Ask me anything!',
};

export const users: User[] = [
  currentUser,
  { id: 'user-2', name: 'Samantha Bee', handle: 'sam_b', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 'user-3', name: 'John Doe', handle: 'johnd', avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 'user-4', name: 'Jane Smith', handle: 'janes', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 'user-5', name: 'Peter Jones', handle: 'petej', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

// COMMENTS
const sampleComments: Comment[] = [
  { id: 'comment-1', user: users[1], text: 'This is amazing!', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 'comment-2', user: users[2], text: 'Great shot!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
];

// POSTS
export const posts: Post[] = [
  {
    id: 'post-1',
    author: users[1],
    content: 'Just enjoying a beautiful sunset at the beach. #sunset #beachlife 🌅',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 152,
    comments: sampleComments,
  },
  {
    id: 'post-5',
    author: users[4],
    content: 'What should be the main focus for our next sprint?',
    poll: {
      question: 'Next sprint focus?',
      options: [
        { id: 'option-1', text: 'UI/UX Polish', votes: 18 },
        { id: 'option-2', text: 'Performance Optimization', votes: 32 },
        { id: 'option-3', text: 'New Feature X', votes: 25 },
      ]
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    likes: 75,
    comments: [],
  },
  {
    id: 'post-2',
    author: users[2],
    content: 'My new setup is finally complete! What do you guys think?',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2070&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 320,
    comments: [],
  },
  {
    id: 'post-3',
    author: users[0],
    content: 'Exploring the city streets today. So much to see!',
    imageUrl: 'https://images.unsplash.com/photo-1490644658840-3f2e3f840c35?q=80&w=2070&auto=format&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 88,
    comments: [{ id: 'comment-3', user: users[3], text: 'Looks so cool!', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() }],
  },
  {
    id: 'post-4',
    author: users[3],
    content: 'My first attempt at making a latte art. It is harder than it looks! ☕️',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 45,
    comments: [],
  },
];

// STORIES
export const stories: Story[] = users.map((user, i) => ({
    id: `story-${i+1}`,
    user,
    imageUrl: `https://picsum.photos/400/700?random=${i+1}`,
    duration: 5000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * (i+1)).toISOString(),
}));

// HIGHLIGHTS
export const highlights: Highlight[] = [
    { id: 'highlight-1', title: 'Travel', coverUrl: 'https://picsum.photos/200/200?random=10', stories: [stories[0], stories[1]] },
    { id: 'highlight-2', title: 'Food', coverUrl: 'https://picsum.photos/200/200?random=11', stories: [stories[2]] },
    { id: 'highlight-3', title: 'Projects', coverUrl: 'https://picsum.photos/200/200?random=12', stories: [stories[3], stories[4]] },
];

// NOTIFICATIONS
export const notifications: Notification[] = [
    { id: 'notif-1', type: 'like', user: users[1], post: posts[2], read: false, timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    { id: 'notif-2', type: 'comment', user: users[3], post: posts[2], read: false, timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
    { id: 'notif-3', type: 'follow', user: users[4], read: true, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
];

// MESSAGES & CONVERSATIONS
const messages1: Message[] = [
    { id: 'msg-1-1', sender: users[1], text: 'Hey, how is it going?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
    { id: 'msg-1-2', sender: currentUser, text: 'Hey Sam! Going well, just working on a new project. You?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), read: true },
    { id: 'msg-1-3', sender: users[1], text: 'Oh nice! Same here. We should catch up soon.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
];
const messages2: Message[] = [
    { id: 'msg-2-1', sender: users[2], text: 'Did you see the latest design mockups?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
    { id: 'msg-2-2', sender: currentUser, text: 'Yes, they look great!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), read: true },
];

const aiMessages: Message[] = [
    { id: 'ai-msg-1', sender: nexusAiUser, text: "Hello! I'm the Nexus AI Assistant. How can I help you today? You can ask me to write a post, brainstorm ideas, or summarize a topic.", timestamp: new Date().toISOString(), read: true }
];

export const conversations: Conversation[] = [
    { id: 'conv-ai', user: nexusAiUser, messages: aiMessages, unreadCount: 1},
    { id: 'conv-1', user: users[1], messages: messages1, unreadCount: 1 },
    { id: 'conv-2', user: users[2], messages: messages2, unreadCount: 0 },
    { id: 'conv-3', user: users[3], messages: [{ id: 'msg-3-1', sender: users[3], text: 'Let me know if you need help with the deployment.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), read: true }], unreadCount: 0 },
];

// REELS
export const reels: Reel[] = [
    {
        id: 'reel-1',
        user: users[4],
        videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4',
        caption: 'Fun times with this little one!',
        audio: { title: 'Upbeat Fun', artist: 'StockMusic' },
        likes: 1234,
        comments: 56,
        shares: 23,
    },
    {
        id: 'reel-2',
        user: users[2],
        videoUrl: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_5MB.mp4',
        caption: 'The ocean is magical.',
        audio: { title: 'Peaceful Water', artist: 'NatureSounds' },
        likes: 5678,
        comments: 234,
        shares: 101,
    }
];
