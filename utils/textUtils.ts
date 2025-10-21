
import React from 'react';
import { users } from '../constants';
import type { User } from '../types';

export const renderInteractiveText = (
    text: string, 
    onMentionClick: (user: User) => void, 
    onHashtagClick: (tag: string) => void
): React.ReactNode[] => {
    const parts = text.split(/([@#]\w+)/g);

    return parts.map((part, index) => {
        if (part.startsWith('@')) {
            const handle = part.substring(1);
            const user = users.find(u => u.handle === handle);
            if (user) {
                return React.createElement(
                    'button',
                    { key: index, onClick: () => onMentionClick(user), className: "text-accent hover:underline font-semibold" },
                    part
                );
            }
        }
        if (part.startsWith('#')) {
            const tag = part.substring(1);
            return React.createElement(
                'button',
                { key: index, onClick: () => onHashtagClick(tag), className: "text-accent hover:underline font-semibold" },
                part
            );
        }
        return part;
    });
};
