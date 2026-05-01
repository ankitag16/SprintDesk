export type Role = 'admin' | 'member';
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';
export type ProjectStatus = 'active' | 'completed' | 'on_hold';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  createdBy: string;
  teamMembers: string[];
  dueDate: string;
  createdAt: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName?: string;
  assignedTo: string;
  assignedToName?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  tags?: string[];
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  user: string;
  timestamp: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: Role;
}
