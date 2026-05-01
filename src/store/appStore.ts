import { create } from 'zustand';
import { Project, Task, Activity, User } from '../types';
import { mockProjects, mockTasks, mockActivities, mockUsers } from '../data/mockData';

interface AppStore {
  users: User[];
  projects: Project[];
  tasks: Task[];
  activities: Activity[];
  // Project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  // Activity
  addActivity: (activity: Activity) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  users: mockUsers,
  projects: mockProjects,
  tasks: mockTasks,
  activities: mockActivities,

  addProject: (project) => set(s => ({ projects: [...s.projects, project] })),
  updateProject: (id, updates) => set(s => ({ projects: s.projects.map(p => p.id === id ? { ...p, ...updates } : p) })),
  deleteProject: (id) => set(s => ({ projects: s.projects.filter(p => p.id !== id) })),

  addTask: (task) => set(s => ({ tasks: [...s.tasks, task] })),
  updateTask: (id, updates) => set(s => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates } : t) })),
  deleteTask: (id) => set(s => ({ tasks: s.tasks.filter(t => t.id !== id) })),

  addActivity: (activity) => set(s => ({ activities: [activity, ...s.activities] })),
}));
