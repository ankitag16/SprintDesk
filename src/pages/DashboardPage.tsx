import React, { useEffect, useState } from 'react';
import { CheckSquare, FolderKanban, CheckCircle2, Clock, AlertCircle, Activity, Plus, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Avatar } from '../components/ui/Avatar';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import { StatCardSkeleton } from '../components/ui/Skeleton';
import { formatDate, timeAgo } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const StatCard: React.FC<{
  label: string;
  value: number;
  sub: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}> = ({ label, value, sub, icon: Icon, iconColor, iconBg }) => (
  <div className="card p-5 card-hover">
    <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center mb-4`}>
      <Icon size={20} className={iconColor} />
    </div>
    <div className="text-3xl font-display font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm font-medium text-gray-500 mb-0.5">{label}</div>
    <div className="text-xs text-gray-400">{sub}</div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { tasks, projects, activities } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
    myTasks: tasks.filter(t => t.assignedTo === user?.id).length,
    activeProjects: projects.filter(p => p.status === 'active').length,
  };

  const recentTasks = tasks.slice(0, 6);
  const activeProjects = projects.filter(p => p.status === 'active');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            {greeting}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => navigate('/app/projects')} className="btn-secondary text-sm">
            <FolderKanban size={16} /> Projects
          </button>
          <button onClick={() => navigate('/app/tasks')} className="btn-primary text-sm">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {[...Array(6)].map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard label="Total Tasks" value={stats.total} sub="All time" icon={CheckSquare} iconColor="text-orange-500" iconBg="bg-orange-50" />
          <StatCard label="Completed" value={stats.completed} sub={`${Math.round(stats.completed / stats.total * 100)}% done`} icon={CheckCircle2} iconColor="text-green-600" iconBg="bg-green-50" />
          <StatCard label="In Progress" value={stats.inProgress} sub="Active now" icon={Clock} iconColor="text-blue-600" iconBg="bg-blue-50" />
          <StatCard label="Overdue" value={stats.overdue} sub="Need attention" icon={AlertCircle} iconColor="text-red-500" iconBg="bg-red-50" />
          <StatCard label="My Tasks" value={stats.myTasks} sub="Assigned to me" icon={Activity} iconColor="text-purple-500" iconBg="bg-purple-50" />
          <StatCard label="Projects" value={stats.activeProjects} sub="Active" icon={FolderKanban} iconColor="text-cyan-500" iconBg="bg-cyan-50" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Active Projects */}
        <div className="card p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-900">Active Projects</h3>
            <button onClick={() => navigate('/app/projects')} className="text-xs text-orange-500 hover:text-orange-600 font-medium">
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {activeProjects.map(p => (
              <div key={p.id}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-sm font-medium text-gray-800 flex-1 truncate">{p.name}</span>
                  <span className="text-xs font-semibold text-gray-600">{p.progress}%</span>
                </div>
                <div className="progress-bar ml-5">
                  <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {activities.slice(0, 6).map(a => (
              <div key={a.id} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-600 leading-relaxed">{a.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.user} · {timeAgo(a.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tasks table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Tasks</h3>
          <button onClick={() => navigate('/app/tasks')} className="text-xs text-orange-500 hover:text-orange-600 font-medium">
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Task', 'Project', 'Assignee', 'Priority', 'Status', 'Due Date'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTasks.map(t => (
                <tr key={t.id} className="border-b border-gray-50 last:border-0 hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-medium text-gray-800 max-w-[160px] truncate block">{t.title}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-gray-500">{t.projectName}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {t.assignedToName && (
                      <div className="flex items-center gap-2">
                        <Avatar name={t.assignedToName} size="sm" />
                        <span className="text-xs text-gray-600">{t.assignedToName.split(' ')[0]}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5"><PriorityBadge priority={t.priority} /></td>
                  <td className="px-4 py-3.5"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {formatDate(t.dueDate)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
