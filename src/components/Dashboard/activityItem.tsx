// src/components/modules/dashboard/ActivityItem.tsx
import React from "react";

interface ActivityItemProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  timestamp,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconBgColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {title}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        <p className="text-xs text-[var(--text-secondary)] mt-1 opacity-80">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
