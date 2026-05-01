import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SignupData } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: SignupData) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, _password) => {
        await new Promise(r => setTimeout(r, 800)); // simulate API
        const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      signup: async (data) => {
        await new Promise(r => setTimeout(r, 800));
        const newUser: User = {
          id: `u${Date.now()}`,
          name: data.name,
          email: data.email,
          role: data.role,
          department: 'General',
        };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
    }),
    { name: 'sprintdesk-auth' }
  )
);
