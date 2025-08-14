// src/components/modules/dashboard/WelcomeCard.tsx
import React from 'react';

interface WelcomeCardProps {
  title: string;
  subtitle: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};

export default WelcomeCard;