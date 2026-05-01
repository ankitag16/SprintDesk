import React, { useState } from 'react';
import { Plus, Search, Trash2, Calendar, FolderOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { ProjectStatusBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';
import { formatDate } from '../utils/helpers';
import { Project, ProjectStatus } from '../types';

const PROJECT_COLORS = ['#f97316','#3b82f6','#8b5cf6','#10b981','#ec4899','#f59e0b','#06b6d4','#ef4444'];

const defaultForm = {
  name: '', description: '', dueDate: '', status: 'active' as ProjectStatus, color: '#f97316',
};

export const ProjectsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { projects, users, addProject, deleteProject } = useAppStore();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const filtered = projects.filter(p =>
    (statusFilter === 'all' || p.status === statusFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = () => {
    if (!form.name.trim()) { addToast('error', 'Project name is required.'); return; }
    const project: Project = {
      id: `p${Date.now()}`,
      name: form.name,
      description: form.description,
      status: form.status,
      progress: 0,
      createdBy: user?.id ?? 'u1',
      teamMembers: [user?.id ?? 'u1'],
      dueDate: form.dueDate || '2025-12-31',
      createdAt: new Date().toISOString().split('T')[0],
      color: form.color,
    };
    addProject(project);
    addToast('success', `Project "${project.name}" created!`);
    setShowModal(false);
    setForm(defaultForm);
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} projects total</p>
        </div>
        {user?.role === 'admin' && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> New Project
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search projects…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'active', 'on_hold', 'completed'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                statusFilter === s
                  ? 'bg-orange-50 text-orange-600 border-orange-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s === 'all' ? 'All' : s === 'on_hold' ? 'On Hold' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No projects found"
          description="Adjust your filters or create a new project to get started."
          action={user?.role === 'admin' ? (
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={16} /> New Project
            </button>
          ) : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(p => {
            const members = p.teamMembers.map(id => users.find(u => u.id === id)).filter(Boolean);
            return (
              <div key={p.id} className="card card-hover p-5">
                <div className="flex gap-3">
                  <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: p.color, minHeight: 40 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug">{p.name}</h3>
                      <ProjectStatusBadge status={p.status} />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>Progress</span>
                        <span className="font-semibold text-gray-700">{p.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.color }} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      {/* Member avatars */}
                      <div className="flex">
                        {members.slice(0, 4).map((m, i) => m && (
                          <div key={m.id} className="border-2 border-white rounded-full" style={{ marginLeft: i > 0 ? -8 : 0 }}>
                            <Avatar name={m.name} size="sm" />
                          </div>
                        ))}
                        {members.length > 4 && (
                          <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white text-xs flex items-center justify-center text-gray-500 font-medium" style={{ marginLeft: -8 }}>
                            +{members.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={11} />
                        {formatDate(p.dueDate)}
                      </div>
                    </div>

                    {/* Admin actions */}
                    {user?.role === 'admin' && (
                      <div className="flex gap-1 mt-3 pt-3 border-t border-gray-100">
                        <button
                          className="btn-icon"
                          onClick={() => setConfirmDelete(p.id)}
                          title="Delete project"
                        >
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Project">
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">Project Name *</label>
            <input
              className="input-field"
              placeholder="e.g. Website Redesign"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Describe the project…"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group mb-0">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="input-field"
                value={form.dueDate}
                onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Status</label>
              <select
                className="input-field cursor-pointer"
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as ProjectStatus }))}
              >
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Color</label>
            <div className="flex gap-2 flex-wrap">
              {PROJECT_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, color: c }))}
                  className="w-7 h-7 rounded-lg transition-all"
                  style={{
                    background: c,
                    outline: form.color === c ? `3px solid ${c}` : '3px solid transparent',
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleCreate}>
              <Plus size={16} /> Create Project
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => { deleteProject(confirmDelete!); addToast('success', 'Project deleted.'); }}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        danger
      />
    </div>
  );
};
