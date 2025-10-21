export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
  followers?: number;
  following?: number;
  highlights?: Highlight[];
  isFollowing?: boolean;
  isVerified?: boolean;
  isOnline?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  poll?: Poll;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
  isBookmarked?: boolean;
  reactions?: { [key: string]: number };
}

export interface Story {
  id:string;
  user: User;
  imageUrl: string;
  duration: number; // in milliseconds
  timestamp: string;
}

export interface Message {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  read: boolean;
  replyTo?: Message;
  attachment?: { 
    type: 'image' | 'file'; 
    url: string; 
    fileName?: string;
    fileSize?: string;
  };
  voiceNote?: {
    url: string;
    duration: number; // in seconds
  };
}

export interface Conversation {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'post' | 'mention';
  user: User;
  post?: { content: string };
  read: boolean;
  timestamp: string;
  message?: string;
}

export interface Highlight {
    id: string;
    title: string;
    coverUrl: string;
}

export interface Reel {
    id: string;
    user: User;
    videoUrl: string;
    caption: string;
    audio: {
        title: string;
        artist: string;
    };
    likes: number;
    comments: number;
    shares: number;
}