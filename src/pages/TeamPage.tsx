import React, { useState } from 'react';
import { Search, UserPlus, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Avatar } from '../components/ui/Avatar';
import { RoleBadge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

export const TeamPage: React.FC = () => {
  const { user } = useAuthStore();
  const { users, tasks } = useAppStore();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.department || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Team</h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} members</p>
        </div>
        {user?.role === 'admin' && (
          <button className="btn-primary" onClick={() => addToast('warning', 'Invite feature coming soon!')}>
            <UserPlus size={16} /> Invite Member
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search team members…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members found"
          description="Try adjusting your search criteria."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(u => {
            const userTasks = tasks.filter(t => t.assignedTo === u.id);
            const completed = userTasks.filter(t => t.status === 'completed').length;
            const inProgress = userTasks.filter(t => t.status === 'in_progress').length;
            const progressPct = userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0;

            return (
              <div key={u.id} className="card card-hover p-6">
                <div className="flex items-start gap-4 mb-5">
                  <Avatar name={u.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-0.5 truncate">{u.name}</h3>
                    <p className="text-sm text-gray-500 mb-2 truncate">{u.email}</p>
                    <div className="flex gap-2">
                      <RoleBadge role={u.role} />
                      {u.department && (
                        <span className="badge bg-gray-100 text-gray-600">{u.department}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mb-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="font-bold text-lg text-gray-900">{userTasks.length}</div>
                    <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Total</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-green-600">{completed}</div>
                    <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Done</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-600">{inProgress}</div>
                    <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Active</div>
                  </div>
                </div>

                {userTasks.length > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Completion</span>
                      <span className="font-semibold text-gray-700">{progressPct}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill bg-orange-400" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
