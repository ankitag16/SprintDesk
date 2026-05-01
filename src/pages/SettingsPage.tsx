import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Avatar } from '../components/ui/Avatar';
import { RoleBadge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
  });

  return (
    <div className="p-6 lg:p-8 max-w-3xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and preferences</p>
      </div>

      <div className="card p-6 md:p-8 mb-6">
        <h3 className="font-semibold text-gray-900 text-base mb-6 border-b border-gray-100 pb-3">Profile Information</h3>
        
        <div className="flex items-center gap-5 mb-8">
          <Avatar name={user?.name || 'User'} size="lg" />
          <div>
            <div className="font-semibold text-gray-900 text-lg mb-1">{user?.name}</div>
            <RoleBadge role={user?.role || 'member'} />
          </div>
        </div>

        <div className="space-y-5 max-w-xl">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="input-field"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              className="input-field"
              value={form.department}
              onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
            />
          </div>
          <div className="pt-2">
            <button className="btn-primary" onClick={() => addToast('success', 'Profile updated successfully!')}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="card p-6 md:p-8">
        <h3 className="font-semibold text-gray-900 text-base mb-6 border-b border-gray-100 pb-3">Notifications</h3>
        
        <div className="space-y-4 max-w-xl">
          {[
            { id: 'n1', label: 'Email notifications', desc: 'Receive daily summary emails' },
            { id: 'n2', label: 'Task assignment alerts', desc: 'When a task is assigned to you' },
            { id: 'n3', label: 'Project updates', desc: 'When projects change status' },
            { id: 'n4', label: 'Weekly digest', desc: 'A weekly report of team activity' }
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={true} onChange={() => addToast('success', `${item.label} preferences updated`)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
