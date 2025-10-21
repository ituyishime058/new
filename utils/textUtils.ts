
import React from 'react';
// FIX: Corrected import path for constants
import { users } from '../constants';
// FIX: Import the User type for better type safety.
import type { User } from '../types';

export const renderInteractiveText = (
    text: string, 
    // FIX: Use the imported User type instead of any.
    onMentionClick: (user: User) => void, 
    onHashtagClick: (tag: string) => void
): React.ReactNode[] => {
    const parts = text.split(/([@#]\w+)/g);

    return parts.map((part, index) => {
        if (part.startsWith('@')) {
            const handle = part.substring(1);
            const user = users.find(u => u.handle === handle);
            if (user) {
                // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
                return React.createElement(
                    'button',
                    { key: index, onClick: () => onMentionClick(user), className: "text-accent hover:underline font-semibold" },
                    part
                );
            }
        }
        if (part.startsWith('#')) {
            const tag = part.substring(1);
            // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
            return React.createElement(
                'button',
                { key: index, onClick: () => onHashtagClick(tag), className: "text-accent hover:underline font-semibold" },
                part
            );
        }
        return part;
    });
};
