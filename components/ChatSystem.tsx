
import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message, User } from '../types';
import { currentUser, nexusAiUser } from '../constants';
import { summarizeConversation } from '../services/geminiService';
import Avatar from './Avatar';
import Icon from './Icon';
import FileAttachment from './FileAttachment';
import VoiceNotePlayer from './VoiceNotePlayer';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

// --- CHAT WINDOW COMPONENT ---
interface ChatWindowProps {
    conversation: Conversation;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onFocus: (id: string) => void;
    onViewProfile: (user: User) => void;
    zIndex: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, onClose, onMinimize, onFocus, onViewProfile, zIndex }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(scrollToBottom, [messages]);
    useEffect(() => setMessages(conversation.messages), [conversation]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const userMessage: Message = {
            id: `msg-${Date.now()}`,
            sender: currentUser,
            text: newMessage,
            timestamp: new Date().toISOString(),
            read: true,
        };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
    };
    
    const handleSummarize = async () => {
        setIsSummarizing(true);
        const summaryText = await summarizeConversation(messages);
        const summaryMessage: Message = {
            id: `msg-summary-${Date.now()}`,
            sender: nexusAiUser,
            text: `✨ Here's a summary of your chat:\n\n${summaryText}`,
            timestamp: new Date().toISOString(),
            read: true,
        };
        setMessages(prev => [...prev, summaryMessage]);
        setIsSummarizing(false);
    };

    return (
        <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            className="fixed bottom-0 right-24 w-80 h-[28rem] bg-primary rounded-t-lg shadow-2xl flex flex-col border border-b-0 border-border-color"
            style={{ zIndex }}
            onMouseDown={() => onFocus(conversation.id)}
            initial={{ y: 450, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 450, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            <header 
                onPointerDown={(e) => dragControls.start(e)}
                className="p-2 border-b border-border-color flex items-center space-x-2 cursor-grab active:cursor-grabbing"
            >
                <button onClick={() => onViewProfile(conversation.user)} className="flex items-center space-x-2 flex-1 text-left">
                    <Avatar src={conversation.user.avatarUrl} alt={conversation.user.name} size="sm" isOnline={conversation.user.isOnline} />
                    <span className="font-bold text-sm truncate">{conversation.user.name}</span>
                </button>
                <button onClick={handleSummarize} disabled={isSummarizing} className="p-1.5 rounded-full hover:bg-secondary disabled:opacity-50" title="Summarize Conversation">
                    {isSummarizing ? <div className="w-4 h-4 border-2 border-accent/50 border-t-accent rounded-full animate-spin"></div> : <Icon name="Sparkles" className="w-4 h-4 text-text-secondary" />}
                </button>
                <button onClick={() => onMinimize(conversation.id)} className="p-1.5 rounded-full hover:bg-secondary"><Icon name="Minus" className="w-4 h-4 text-text-secondary" /></button>
                <button onClick={() => onClose(conversation.id)} className="p-1.5 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-4 h-4 text-text-secondary" /></button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                 {messages.map((msg, i) => (
                    <div key={i} className={`flex items-end gap-2 ${msg.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                         {msg.sender.id !== currentUser.id && <Avatar src={msg.sender.avatarUrl} alt={msg.sender.name} size="sm" />}
                        <div className={`max-w-[80%] px-3 py-2 rounded-2xl ${msg.sender.id === currentUser.id ? 'bg-accent text-white rounded-br-none' : 'bg-secondary rounded-bl-none'}`}>
                           <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                        </div>
                    </div>
                 ))}
                 <div ref={messagesEndRef} />
            </div>

            <footer className="p-2 border-t border-border-color">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type..." className="w-full bg-secondary rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"/>
                    <button type="submit" className="p-1.5 rounded-full text-accent"><Icon name="PaperAirplane" className="w-5 h-5"/></button>
                </form>
            </footer>
        </motion.div>
    );
};

// --- ACTIVE CHATS BAR COMPONENT ---
interface ActiveChatsBarProps {
    minimizedConversations: Conversation[];
    onRestore: (conv: Conversation) => void;
}
const ActiveChatsBar: React.FC<ActiveChatsBarProps> = ({ minimizedConversations, onRestore }) => (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex space-x-2 p-2">
        <AnimatePresence>
        {minimizedConversations.map(conv => (
            <motion.button
                key={conv.id}
                onClick={() => onRestore(conv)}
                className="flex items-center space-x-2 bg-primary pr-3 rounded-full shadow-lg border border-border-color hover:bg-secondary"
                layoutId={`chat-bubble-${conv.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <Avatar src={conv.user.avatarUrl} alt={conv.user.name} size="md" isOnline={conv.user.isOnline} />
                <span className="font-semibold text-sm">{conv.user.name}</span>
            </motion.button>
        ))}
        </AnimatePresence>
    </div>
);

// --- CHAT SYSTEM MANAGER COMPONENT ---
interface ChatSystemProps {
    activeConversations: Conversation[];
    minimizedConvIds: Set<string>;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onRestore: (conv: Conversation) => void;
    onFocus: (id: string) => void;
    onViewProfile: (user: User) => void;
}

const ChatSystem: React.FC<ChatSystemProps> = (props) => {
    const { activeConversations, minimizedConvIds } = props;

    const openConversations = activeConversations.filter(c => !minimizedConvIds.has(c.id));
    const minimizedConversations = activeConversations.filter(c => minimizedConvIds.has(c.id));

    return (
        <>
            <div className="fixed bottom-0 right-0 z-40">
                <AnimatePresence>
                    {openConversations.map((conv, index) => (
                        <ChatWindow 
                            key={conv.id}
                            conversation={conv}
                            zIndex={50 + index}
                            {...props}
                        />
                    ))}
                </AnimatePresence>
            </div>
            <ActiveChatsBar minimizedConversations={minimizedConversations} onRestore={props.onRestore} />
        </>
    );
};

export default ChatSystem;
