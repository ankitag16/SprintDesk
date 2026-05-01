import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-200/80 animate-pulse rounded-lg ${className}`} />
);

export const StatCardSkeleton: React.FC = () => (
  <div className="card p-5 space-y-3">
    <Skeleton className="h-10 w-10 rounded-xl" />
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-3 w-32" />
  </div>
);

export const TaskCardSkeleton: React.FC = () => (
  <div className="card p-4 space-y-3">
    <div className="flex gap-3">
      <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export const ProjectCardSkeleton: React.FC = () => (
  <div className="card p-5 space-y-4">
    <div className="flex gap-3">
      <Skeleton className="w-1 h-10 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
    <Skeleton className="h-2 w-full rounded-full" />
    <div className="flex justify-between">
      <div className="flex gap-1">
        {[0,1,2].map(i => <Skeleton key={i} className="w-7 h-7 rounded-full" />)}
      </div>
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);
