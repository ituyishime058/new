
import React from 'react';
import { motion } from 'framer-motion';

interface ReactionPickerProps {
  onSelect: (reaction: string) => void;
}

const reactions = ['👍', '❤️', '😂', '😯', '😢', '😡'];

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelect }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute -top-12 left-0 bg-primary shadow-lg rounded-full p-2 flex space-x-2 border border-border-color"
    >
      {reactions.map((reaction, index) => (
        <motion.button
          key={reaction}
          onClick={() => onSelect(reaction)}
          whileHover={{ scale: 1.3 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-2xl"
        >
          {reaction}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ReactionPicker;
