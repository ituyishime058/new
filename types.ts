export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  isOnline?: boolean;
  isFollowing?: boolean;
  followers?: number;
  following?: number;
  bio?: string;
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
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  imageUrl?: string;
  poll?: Poll;
  isBookmarked?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  duration: number; // in seconds
  isSeen?: boolean;
  timestamp: string;
}

export interface MessageAttachment {
    type: 'image' | 'file';
    url: string;
    fileName: string;
    fileSize: string;
}

export interface VoiceNote {
    url: string;
    duration: number; // in seconds
}

export interface Message {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  read: boolean;
  replyTo?: Message;
  attachment?: MessageAttachment;
  voiceNote?: VoiceNote;
}

export interface Conversation {
  id: string;
  user: User;
  messages: Message[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'post';
  user: User;
  timestamp: string;
  read: boolean;
  post?: {
    id: string;
    content: string;
  };
  message?: string;
}

export interface Highlight {
  id: string;
  title: string;
  coverImageUrl: string;
}

export interface ReelAudio {
  title: string;
  artist: string;
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  caption: string;
  audio: ReelAudio;
  likes: number;
  comments: number;
  shares: number;
}

export interface TrendingTopic {
    tag: string;
    posts: number;
    imageUrl: string;
}

export interface LoginActivity {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    isCurrent: boolean;
}
