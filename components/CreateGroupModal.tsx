import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types.ts';
import { users } from '../constants.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (groupName: string, members: User[]) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const handleToggleUser = (user: User) => {
        setSelectedUsers(prev =>
            prev.find(u => u.id === user.id)
                ? prev.filter(u => u.id !== user.id)
                : [...prev, user]
        );
    };
    
    const handleCreate = () => {
        if (groupName.trim() && selectedUsers.length > 0) {
            onCreate(groupName, selectedUsers);
            onClose();
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-primary rounded-xl w-full max-w-md shadow-lg flex flex-col h-[70vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        <header className="p-4 border-b border-border-color">
                            <h2 className="font-bold text-lg">Create Group Chat</h2>
                        </header>
                        <div className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Group Name"
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                                className="w-full bg-secondary p-2 rounded-md"
                            />
                            <h3 className="font-semibold text-sm text-text-secondary">Select Members</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 space-y-2">
                            {users.map(user => (
                                <button key={user.id} onClick={() => handleToggleUser(user)} className="w-full flex items-center justify-between p-2 hover:bg-secondary rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Avatar src={user.avatarUrl} alt={user.name}/>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 ${selectedUsers.find(u => u.id === user.id) ? 'bg-accent border-accent' : 'border-border-color'}`}>
                                        {selectedUsers.find(u => u.id === user.id) && <Icon name="Check" className="w-5 h-5 text-white"/>}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <footer className="p-4 border-t border-border-color">
                            <button onClick={handleCreate} disabled={!groupName.trim() || selectedUsers.length === 0} className="w-full bg-accent text-white font-bold py-2 rounded-lg disabled:opacity-50">
                                Create Group
                            </button>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateGroupModal;
