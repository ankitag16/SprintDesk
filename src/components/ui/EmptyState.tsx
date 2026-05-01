import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
      <Icon size={28} className="text-orange-400" />
    </div>
    <h3 className="font-semibold text-gray-800 mb-1 text-base">{title}</h3>
    <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">{description}</p>
    {action}
  </div>
);
