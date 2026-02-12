import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'teacher';
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: (email: string, password: string) => {
    // Mock authentication
    if (email && password) {
      const isTeacher = email.includes('teacher');
      const user: User = {
        id: isTeacher ? 't1' : 'p1',
        name: isTeacher ? 'Ms. Sarah Johnson' : 'John Smith',
        email: email,
        role: isTeacher ? 'teacher' : 'parent',
      };
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));
