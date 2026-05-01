import React from 'react';
import { TaskStatus, TaskPriority, ProjectStatus } from '../../types';

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  todo: { label: 'To Do', className: 'bg-gray-100 text-gray-600' },
  in_progress: { label: 'In Progress', className: 'bg-blue-50 text-blue-600' },
  completed: { label: 'Completed', className: 'bg-green-50 text-green-600' },
  overdue: { label: 'Overdue', className: 'bg-red-50 text-red-600' },
};

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-gray-100 text-gray-500' },
  medium: { label: 'Medium', className: 'bg-amber-50 text-amber-600' },
  high: { label: 'High', className: 'bg-red-50 text-red-500' },
};

const projectStatusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-50 text-green-600' },
  completed: { label: 'Completed', className: 'bg-blue-50 text-blue-600' },
  on_hold: { label: 'On Hold', className: 'bg-amber-50 text-amber-600' },
};

export const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const { label, className } = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' };
  return <span className={`badge ${className}`}>{label}</span>;
};

export const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const { label, className } = priorityConfig[priority] ?? { label: priority, className: 'bg-gray-100 text-gray-500' };
  return <span className={`badge ${className}`}>{label}</span>;
};

export const ProjectStatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const { label, className } = projectStatusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' };
  return <span className={`badge ${className}`}>{label}</span>;
};

export const RoleBadge: React.FC<{ role: string }> = ({ role }) => (
  <span className={`badge capitalize ${role === 'admin' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
    {role}
  </span>
);
