
import React from 'react';
import { trendingTopics } from '../constants';
import Icon from './Icon';

const TrendingTopics: React.FC = () => {
  return (
    <div className="bg-primary p-4 rounded-xl shadow-sm">
      <h2 className="font-bold text-text-primary mb-4 flex items-center space-x-2">
        <Icon name="Fire" className="w-5 h-5 text-accent" />
        <span>Trending Now</span>
      </h2>
      <div className="space-y-2">
        {trendingTopics.map((topic) => (
          <button key={topic.tag} className="w-full text-left group relative rounded-lg overflow-hidden h-20 block">
            <img src={topic.imageUrl} alt={topic.tag} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            <div className="absolute bottom-2 left-3 text-white">
              <p className="font-bold text-sm">#{topic.tag}</p>
              <p className="text-xs text-gray-300">{topic.posts.toLocaleString()} posts</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
