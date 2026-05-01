import { format, formatDistanceToNow, isAfter } from 'date-fns';

export const formatDate = (date: string) => format(new Date(date), 'MMM d, yyyy');

export const timeAgo = (timestamp: string) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true });

export const isOverdue = (dueDate: string) => isAfter(new Date(), new Date(dueDate));

const colors = ['bg-orange-400', 'bg-blue-400', 'bg-purple-400', 'bg-emerald-400', 'bg-pink-400', 'bg-cyan-400'];
const hexColors = ['#fb923c', '#60a5fa', '#a78bfa', '#34d399', '#f472b6', '#22d3ee'];

export const getAvatarColor = (name: string) => colors[name.charCodeAt(0) % colors.length];
export const getAvatarHex = (name: string) => hexColors[name.charCodeAt(0) % hexColors.length];
export const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
