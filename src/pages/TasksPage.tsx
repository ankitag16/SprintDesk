import React, { useState } from 'react';
import { Search, Plus, Trash2, Calendar, Pencil, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';
import { formatDate } from '../utils/helpers';
import { Task, TaskStatus, TaskPriority } from '../types';

const defaultForm = {
  title: '', description: '', projectId: '', assignedTo: '', priority: 'medium' as TaskPriority, status: 'todo' as TaskStatus, dueDate: '', tags: '',
};

export const TasksPage: React.FC = () => {
  const { user } = useAuthStore();
  const { tasks, projects, users, addTask, updateTask, deleteTask } = useAppStore();
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);

  const filtered = tasks.filter(t =>
    (statusFilter === 'all' || t.status === statusFilter) &&
    (priorityFilter === 'all' || t.priority === priorityFilter) &&
    (projectFilter === 'all' || t.projectId === projectFilter) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
  );

  const openCreate = () => {
    setEditTask(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setForm({
      title: task.title, description: task.description, projectId: task.projectId, assignedTo: task.assignedTo,
      priority: task.priority, status: task.status, dueDate: task.dueDate, tags: (task.tags || []).join(', ')
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { addToast('error', 'Task title is required.'); return; }
    
    const proj = projects.find(p => p.id === form.projectId);
    const assignee = users.find(u => u.id === form.assignedTo);
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    if (editTask) {
      updateTask(editTask.id, {
        ...form, projectName: proj?.name, assignedToName: assignee?.name, tags
      });
      addToast('success', 'Task updated!');
    } else {
      const task: Task = {
        id: `t${Date.now()}`, ...form, projectName: proj?.name || '', assignedToName: assignee?.name || '',
        tags, createdBy: user?.id || 'u1', createdAt: new Date().toISOString().split('T')[0],
      };
      addTask(task);
      addToast('success', 'Task created!');
    }
    setShowModal(false);
  };

  const cycleStatus = (task: Task) => {
    const cycle: Record<TaskStatus, TaskStatus> = { todo: 'in_progress', in_progress: 'completed', completed: 'todo', overdue: 'in_progress' };
    updateTask(task.id, { status: cycle[task.status] });
    addToast('success', `Status updated!`);
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} tasks</p>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={16} /> New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field pl-9"
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field w-auto min-w-[140px] cursor-pointer" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <select className="input-field w-auto min-w-[140px] cursor-pointer" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select className="input-field w-auto min-w-[160px] cursor-pointer" value={projectFilter} onChange={e => setProjectFilter(e.target.value)}>
          <option value="all">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="No tasks found"
          description="Try adjusting your filters or create a new task."
          action={<button className="btn-primary" onClick={openCreate}><Plus size={16} /> New Task</button>}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(t => (
            <div key={t.id} className="card card-hover p-4 flex gap-4 items-start animate-slide-up">
              <button
                className={`mt-0.5 btn-icon w-6 h-6 p-0 rounded-full flex-shrink-0 ${t.status === 'completed' ? 'text-green-500 hover:text-green-600' : 'text-gray-300 hover:text-orange-400'}`}
                onClick={() => cycleStatus(t)}
                title="Toggle status"
              >
                <CheckCircle2 size={20} fill={t.status === 'completed' ? 'currentColor' : 'none'} className={t.status === 'completed' ? 'text-white' : ''} />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold mb-1 ${t.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {t.title}
                </div>
                {t.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{t.description}</p>}
                
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusBadge status={t.status} />
                  <PriorityBadge priority={t.priority} />
                  {t.projectName && <span className="text-xs text-gray-400 px-1 border-l border-gray-200">{t.projectName}</span>}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {t.assignedToName && (
                    <div className="flex items-center gap-1.5">
                      <Avatar name={t.assignedToName} size="sm" />
                      <span className="text-xs font-medium text-gray-600">{t.assignedToName}</span>
                    </div>
                  )}
                  {t.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} /> {formatDate(t.dueDate)}
                    </div>
                  )}
                  <div className="flex gap-1 ml-auto">
                    {t.tags?.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button className="btn-icon" onClick={() => openEdit(t)} title="Edit"><Pencil size={15} /></button>
                <button className="btn-icon text-red-400 hover:text-red-500 hover:bg-red-50" onClick={() => setConfirmDelete(t.id)} title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editTask ? 'Edit Task' : 'New Task'}>
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="input-field" placeholder="Task title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="input-field resize-none" rows={3} placeholder="Describe the task…" value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group mb-0">
              <label className="form-label">Project</label>
              <select className="input-field cursor-pointer" value={form.projectId} onChange={e => setForm(f => ({...f, projectId: e.target.value}))}>
                <option value="">No project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Assignee</label>
              <select className="input-field cursor-pointer" value={form.assignedTo} onChange={e => setForm(f => ({...f, assignedTo: e.target.value}))}>
                <option value="">Unassigned</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group mb-0">
              <label className="form-label">Priority</label>
              <select className="input-field cursor-pointer" value={form.priority} onChange={e => setForm(f => ({...f, priority: e.target.value as TaskPriority}))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Status</label>
              <select className="input-field cursor-pointer" value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value as TaskStatus}))}>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group mb-0">
              <label className="form-label">Due Date</label>
              <input type="date" className="input-field" value={form.dueDate} onChange={e => setForm(f => ({...f, dueDate: e.target.value}))} />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Tags</label>
              <input className="input-field" placeholder="design, backend..." value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>
              {editTask ? 'Save Changes' : <><Plus size={16} /> Create Task</>}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => { deleteTask(confirmDelete!); addToast('success', 'Task deleted.'); }}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        danger
      />
    </div>
  );
};
