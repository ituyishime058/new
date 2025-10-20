
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '../types';
import Icon from './Icon';

interface NotificationToastProps {
  notification: Notification | null;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
    const getIcon = () => {
        if (!notification) return null;
        switch (notification.type) {
            case 'like': return <Icon name="Heart" className="w-5 h-5 text-red-500" />;
            case 'comment': return <Icon name="ChatBubbleOvalLeft" className="w-5 h-5 text-blue-500" />;
            case 'follow': return <Icon name="UserPlus" className="w-5 h-5 text-green-500" />;
            case 'post': return <Icon name="CheckCircle" className="w-5 h-5 text-green-500" />;
            default: return null;
        }
    };

    const getText = () => {
        if (!notification) return '';
        if (notification.message) return notification.message;

        switch (notification.type) {
            case 'like': return <><span className="font-bold">{notification.user.name}</span> liked your post.</>;
            case 'comment': return <><span className="font-bold">{notification.user.name}</span> commented on your post.</>;
            case 'follow': return <><span className="font-bold">{notification.user.name}</span> started following you.</>;
            default: return '';
        }
    };
    
    React.useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification, onClose]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-sm z-50"
        >
          <div className="bg-primary shadow-2xl rounded-xl p-4 m-4 border border-border-color flex items-start space-x-3">
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1">
                <p className="text-sm text-text-primary">{getText()}</p>
            </div>
            <button onClick={onClose}><Icon name="XMark" className="w-4 h-4 text-text-secondary" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
