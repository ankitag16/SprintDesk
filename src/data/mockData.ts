import { User, Project, Task, Activity } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Rivera', email: 'admin@sprintdesk.com', role: 'admin', department: 'Engineering' },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@sprintdesk.com', role: 'member', department: 'Design' },
  { id: 'u3', name: 'Marcus Johnson', email: 'marcus@sprintdesk.com', role: 'member', department: 'Marketing' },
  { id: 'u4', name: 'Sofia Chen', email: 'sofia@sprintdesk.com', role: 'member', department: 'Engineering' },
  { id: 'u5', name: 'James Okafor', email: 'james@sprintdesk.com', role: 'admin', department: 'Product' },
];

export const mockProjects: Project[] = [
  { id: 'p1', name: 'Website Redesign', description: 'Complete overhaul of the company website with new design system', status: 'active', progress: 68, createdBy: 'u1', teamMembers: ['u1','u2','u3'], dueDate: '2025-06-30', createdAt: '2025-04-01', color: '#f97316' },
  { id: 'p2', name: 'Mobile App v2', description: 'Second version of the mobile application with new features', status: 'active', progress: 42, createdBy: 'u1', teamMembers: ['u1','u4','u5'], dueDate: '2025-07-15', createdAt: '2025-03-15', color: '#3b82f6' },
  { id: 'p3', name: 'Marketing Campaign', description: 'Q2 marketing campaign for product launch', status: 'active', progress: 85, createdBy: 'u5', teamMembers: ['u3','u5'], dueDate: '2025-05-31', createdAt: '2025-04-10', color: '#8b5cf6' },
  { id: 'p4', name: 'API Integration', description: 'Third-party API integrations for payment and auth', status: 'on_hold', progress: 25, createdBy: 'u1', teamMembers: ['u1','u4'], dueDate: '2025-08-01', createdAt: '2025-04-20', color: '#10b981' },
  { id: 'p5', name: 'Analytics Dashboard', description: 'Internal analytics and reporting dashboard', status: 'completed', progress: 100, createdBy: 'u5', teamMembers: ['u2','u4','u5'], dueDate: '2025-04-15', createdAt: '2025-02-01', color: '#ec4899' },
];

export const mockTasks: Task[] = [
  { id: 't1', title: 'Design new homepage hero', description: 'Create a modern hero section with animation', projectId: 'p1', projectName: 'Website Redesign', assignedTo: 'u2', assignedToName: 'Priya Sharma', priority: 'high', status: 'in_progress', dueDate: '2025-05-20', createdBy: 'u1', createdAt: '2025-04-05', tags: ['design','frontend'] },
  { id: 't2', title: 'Implement authentication flow', description: 'Build login, signup, and password reset flows', projectId: 'p2', projectName: 'Mobile App v2', assignedTo: 'u4', assignedToName: 'Sofia Chen', priority: 'high', status: 'in_progress', dueDate: '2025-05-25', createdBy: 'u1', createdAt: '2025-04-02', tags: ['backend','security'] },
  { id: 't3', title: 'Write Q2 blog posts', description: 'Create 5 blog posts for Q2 campaign', projectId: 'p3', projectName: 'Marketing Campaign', assignedTo: 'u3', assignedToName: 'Marcus Johnson', priority: 'medium', status: 'completed', dueDate: '2025-05-10', createdBy: 'u5', createdAt: '2025-04-12', tags: ['content','marketing'] },
  { id: 't4', title: 'Setup Stripe integration', description: 'Integrate Stripe for payment processing', projectId: 'p4', projectName: 'API Integration', assignedTo: 'u4', assignedToName: 'Sofia Chen', priority: 'high', status: 'todo', dueDate: '2025-04-28', createdBy: 'u1', createdAt: '2025-04-22', tags: ['backend','payments'] },
  { id: 't5', title: 'Mobile nav component', description: 'Build responsive mobile navigation', projectId: 'p2', projectName: 'Mobile App v2', assignedTo: 'u2', assignedToName: 'Priya Sharma', priority: 'medium', status: 'todo', dueDate: '2025-05-30', createdBy: 'u1', createdAt: '2025-04-15', tags: ['mobile','ui'] },
  { id: 't6', title: 'SEO meta tags update', description: 'Update all meta tags for SEO optimization', projectId: 'p1', projectName: 'Website Redesign', assignedTo: 'u3', assignedToName: 'Marcus Johnson', priority: 'low', status: 'completed', dueDate: '2025-04-20', createdBy: 'u1', createdAt: '2025-04-08', tags: ['seo'] },
  { id: 't7', title: 'Update API documentation', description: 'Document all REST endpoints with Swagger', projectId: 'p4', projectName: 'API Integration', assignedTo: 'u1', assignedToName: 'Alex Rivera', priority: 'medium', status: 'overdue', dueDate: '2025-04-15', createdBy: 'u1', createdAt: '2025-04-01', tags: ['docs'] },
  { id: 't8', title: 'Social media assets', description: 'Design banners and posts for campaign', projectId: 'p3', projectName: 'Marketing Campaign', assignedTo: 'u2', assignedToName: 'Priya Sharma', priority: 'medium', status: 'in_progress', dueDate: '2025-05-22', createdBy: 'u5', createdAt: '2025-04-14', tags: ['design','social'] },
  { id: 't9', title: 'Performance audit', description: 'Audit and optimize page load performance', projectId: 'p1', projectName: 'Website Redesign', assignedTo: 'u1', assignedToName: 'Alex Rivera', priority: 'high', status: 'todo', dueDate: '2025-06-01', createdBy: 'u1', createdAt: '2025-04-18', tags: ['performance'] },
  { id: 't10', title: 'Push notifications', description: 'Implement push notification system', projectId: 'p2', projectName: 'Mobile App v2', assignedTo: 'u5', assignedToName: 'James Okafor', priority: 'medium', status: 'overdue', dueDate: '2025-04-10', createdBy: 'u1', createdAt: '2025-03-20', tags: ['mobile'] },
  { id: 't11', title: 'User onboarding flow', description: 'Design and build user onboarding experience', projectId: 'p2', projectName: 'Mobile App v2', assignedTo: 'u2', assignedToName: 'Priya Sharma', priority: 'high', status: 'todo', dueDate: '2025-06-10', createdBy: 'u5', createdAt: '2025-04-25', tags: ['ux','mobile'] },
  { id: 't12', title: 'Database schema design', description: 'Design optimized database schema', projectId: 'p5', projectName: 'Analytics Dashboard', assignedTo: 'u4', assignedToName: 'Sofia Chen', priority: 'high', status: 'completed', dueDate: '2025-04-10', createdBy: 'u5', createdAt: '2025-02-10', tags: ['database'] },
];

export const mockActivities: Activity[] = [
  { id: 'a1', type: 'task_completed', message: 'Completed "Write Q2 blog posts"', user: 'Marcus Johnson', timestamp: '2025-05-10T09:30:00Z' },
  { id: 'a2', type: 'task_created', message: 'Created task "User onboarding flow"', user: 'James Okafor', timestamp: '2025-04-25T14:20:00Z' },
  { id: 'a3', type: 'project_created', message: 'Created project "Mobile App v2"', user: 'Alex Rivera', timestamp: '2025-04-22T10:00:00Z' },
  { id: 'a4', type: 'member_added', message: 'Added Sofia Chen to API Integration', user: 'Alex Rivera', timestamp: '2025-04-22T11:15:00Z' },
  { id: 'a5', type: 'status_changed', message: 'Moved "Homepage hero" to In Progress', user: 'Priya Sharma', timestamp: '2025-04-21T16:45:00Z' },
  { id: 'a6', type: 'task_completed', message: 'Completed "SEO meta tags update"', user: 'Marcus Johnson', timestamp: '2025-04-20T13:00:00Z' },
  { id: 'a7', type: 'task_created', message: 'Created task "Performance audit"', user: 'Alex Rivera', timestamp: '2025-04-18T09:00:00Z' },
];
