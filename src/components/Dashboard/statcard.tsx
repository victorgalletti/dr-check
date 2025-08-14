// src/components/modules/dashboard/StatCard.tsx
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, bgColor, title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bgColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;