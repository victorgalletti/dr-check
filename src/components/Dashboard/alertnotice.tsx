// src/components/modules/dashboard/AlertNotice.tsx
import React from 'react';
import { MdWarning } from 'react-icons/md';

interface AlertNoticeProps {
  message: string;
}

const AlertNotice: React.FC<AlertNoticeProps> = ({ message }) => {
  return (
    <div className="mt-8 p-4 rounded-lg bg-yellow-50 border border-yellow-300 flex items-start space-x-3">
      <MdWarning className="h-5 w-5 text-yellow-500 mt-0.5" />
      <p className="text-sm text-yellow-800">{message}</p>
    </div>
  );
};

export default AlertNotice;