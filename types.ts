
export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  isOnline?: boolean;
  bio?: string;
  followers?: number;
  following?: number;
  isFollowing?: boolean;
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
  comments: Comment[];
  imageUrl?: string;
  poll?: Poll;
  isBookmarked?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  timestamp: string;
  duration: number; // in milliseconds
}

export interface Highlight {
  id: string;
  title: string;
  coverImageUrl: string;
  stories: Story[];
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
  type: 'like' | 'comment' | 'follow' | 'post';
  user: User;
  post?: {
      content: string;
  };
  timestamp: string;
  read: boolean;
  message?: string;
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

export interface LoginActivity {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    timestamp: string;
    isCurrent: boolean;
}

export interface TrendingTopic {
    tag: string;
    posts: number;
    imageUrl: string;
}
