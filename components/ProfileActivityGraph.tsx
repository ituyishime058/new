import React from 'react';

const ProfileActivityGraph: React.FC = () => {
    const activityData = [
        { day: 'Mon', count: 4 },
        { day: 'Tue', count: 7 },
        { day: 'Wed', count: 2 },
        { day: 'Thu', count: 9 },
        { day: 'Fri', count: 5 },
        { day: 'Sat', count: 12 },
        { day: 'Sun', count: 3 },
    ];
    const maxCount = Math.max(...activityData.map(d => d.count), 1);

  return (
    <div className="bg-secondary rounded-lg p-4">
        <h3 className="font-bold text-text-primary mb-4">Weekly Activity</h3>
        <div className="flex justify-between items-end h-40 space-x-2">
            {activityData.map(data => (
                <div key={data.day} className="flex-1 flex flex-col items-center justify-end">
                    <div
                        className="w-full bg-gradient-to-t from-accent-start to-accent-end rounded-t-md hover:opacity-80 transition-opacity"
                        style={{ height: `${(data.count / maxCount) * 100}%` }}
                        title={`${data.count} posts`}
                    />
                    <p className="text-xs text-text-secondary mt-2">{data.day}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ProfileActivityGraph;