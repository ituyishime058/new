
import React, { useState, useMemo } from 'react';
// FIX: Add file extension to import.
import { Poll as PollType } from '../types.ts';
import { motion } from 'framer-motion';
import Icon from './Icon.tsx';

interface PollProps {
  pollData: PollType;
}

const Poll: React.FC<PollProps> = ({ pollData }) => {
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [poll, setPoll] = useState(pollData);

  const totalVotes = useMemo(() => {
    return poll.options.reduce((sum, option) => sum + option.votes, 0);
  }, [poll]);

  const handleVote = (optionId: string) => {
    if (votedOptionId) return;

    setVotedOptionId(optionId);
    setPoll(prevPoll => {
        const newOptions = prevPoll.options.map(opt => {
            if (opt.id === optionId) {
                return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
        });
        return { ...prevPoll, options: newOptions };
    });
  };

  return (
    <div className="border border-border-color rounded-xl p-4 space-y-3">
      <h3 className="font-bold text-text-primary">{poll.question}</h3>
      <div className="space-y-2">
        {poll.options.map(option => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isVoted = votedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!!votedOptionId}
              className="w-full text-left p-2 border border-border-color rounded-lg relative overflow-hidden group disabled:cursor-default"
            >
              {votedOptionId && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-accent/20"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              )}
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="font-semibold text-text-primary">{option.text}</span>
                    {isVoted && <Icon name="CheckCircle" variant="solid" className="w-5 h-5 text-accent ml-2" />}
                </div>
                {votedOptionId && (
                    <span className="text-sm font-bold text-text-primary">{percentage.toFixed(0)}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-text-secondary">{totalVotes} votes</p>
    </div>
  );
};

export default Poll;