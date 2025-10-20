
export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  OTHER = 'other',
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface Comment {
  id:string;
  user: User;
  text: string;
  timestamp: string;
}

export interface PostFile {
    name: string;
    url: string;
    type: string;
}

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface Poll {
    question: string;
    options: PollOption[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  file?: PostFile;
  poll?: Poll;
  timestamp: string;
  likes: number;
  comments: Comment[];
  reactions?: { [key: string]: number };
}

export interface Story {
    id: string;
    user: User;
    imageUrl: string;
    duration: number;
    timestamp: string;
}

export interface Highlight {
    id: string;
    title: string;
    coverUrl: string;
    stories: Story[];
}

export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'post';
    user: User;
    post?: Post;
    read: boolean;
    timestamp: string;
    message?: string;
}

export interface Message {
    id: string;
    sender: User;
    text: string;
    timestamp: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    user: User;
    messages: Message[];
    unreadCount: number;
}

export interface Audio {
    title: string;
    artist: string;
}

export interface Reel {
    id: string;
    user: User;
    videoUrl: string;
    caption: string;
    audio: Audio;
    likes: number;
    comments: number;
    shares: number;
}
