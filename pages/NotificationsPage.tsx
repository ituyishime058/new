
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
// FIX: Add file extension to imports.
import { notifications as initialNotifications } from '../constants.ts';
import { Notification } from '../types.ts';
import Icon from '../components/Icon.tsx';
import Avatar from '../components/Avatar.tsx';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'like': return <Icon name="Heart" className="w-6 h-6 text-red-500" />;
            case 'comment': return <Icon name="ChatBubbleOvalLeft" className="w-6 h-6 text-blue-500" />;
            case 'follow': return <Icon name="UserPlus" className="w-6 h-6 text-green-500" />;
            default: return null;
        }
    };

    const getText = () => {
        switch (notification.type) {
            case 'like': return <><span className="font-bold">{notification.user.name}</span> liked your post.</>;
            case 'comment': return <><span className="font-bold">{notification.user.name}</span> commented on your post.</>;
            case 'follow': return <><span className="font-bold">{notification.user.name}</span> started following you.</>;
            default: return '';
        }
    };
    
    return (
        <div className={`flex items-start space-x-4 p-4 border-b border-border-color ${!notification.read ? 'bg-secondary' : ''}`}>
            <div className="mt-1">{getIcon()}</div>
            <div className="flex-1">
                <Avatar src={notification.user.avatarUrl} alt={notification.user.name} size="md" />
                <p className="mt-2 text-text-primary">{getText()}</p>
                {notification.post && <p className="text-sm text-text-secondary mt-1 p-2 bg-background rounded-md">"{notification.post.content}"</p>}
                <p className="text-xs text-text-secondary mt-2">{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</p>
            </div>
        </div>
    );
};

const NotificationsPage: React.FC = () => {
  return (
    <div className="bg-primary shadow-md rounded-xl overflow-hidden">
        <header className="p-4 border-b border-border-color">
            <h1 className="text-xl font-bold text-text-primary">Notifications</h1>
        </header>
        <div>
            {initialNotifications.map(n => <NotificationItem key={n.id} notification={n} />)}
        </div>
    </div>
  );
};

export default NotificationsPage;