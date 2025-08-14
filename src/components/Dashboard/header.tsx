// src/components/layout/Header.tsx
import React from 'react';
import { MdNotifications, MdMoreVert } from 'react-icons/md';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white p-4 shadow-sm flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <MdNotifications className="h-6 w-6 text-gray-400" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            3
          </span>
        </div>
        <MdMoreVert className="h-6 w-6 text-gray-400" />
      </div>
    </header>
  );
};

export default Header;