import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  address: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);