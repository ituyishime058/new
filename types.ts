export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  isOnline?: boolean;
  followers?: number;
  following?: number;
  bio?: string;
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
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'post';
  user: User;
  timestamp: string;
  read: boolean;
  message?: string;
  post?: Post;
}

export interface Attachment {
    fileName: string;
    fileSize: string;
    url: string;
    type: 'image' | 'video' | 'file';
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
  isRead: boolean;
  reactions?: { [emoji: string]: string[] }; // emoji -> userIds
  attachment?: Attachment;
  voiceNote?: VoiceNote;
}

export interface Conversation {
  id:string;
  user: User;
  messages: Message[];
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived?: boolean;
  isGroup?: boolean;
  groupName?: string;
  participants?: User[];
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  timestamp: string;
  duration: number; // in seconds
  isSeen: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  coverImageUrl: string;
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
    isCurrent: boolean;
}
