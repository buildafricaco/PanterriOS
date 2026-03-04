import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logout } from '@/services/auth';
import { UserProfileRes } from '@/interface';

interface AuthState {
  user: UserProfileRes | null;
  avatarUrl?: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  // Actions

  setAuth: (user: UserProfileRes) => Promise<void>;
  updateUser: (userData: Partial<UserProfileRes>) => Promise<UserProfileRes>;
  updateUserAvatar: (avatarUrl: string) => void;
  clearAuth: () => Promise<void>;
  loadAuth: () => Promise<void>;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      avatarUrl: null,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setAuth: async (user) => {
        try {
          set({ isLoading: true });
          set({
            user: user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to set authentication:', error);
          set({ isLoading: false });
        }
      },

      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser) throw new Error('No user to update');

        const updatedUser = { ...currentUser, ...userData };
        set({ user: updatedUser });
        return updatedUser;
      },

      clearAuth: async () => {
        try {
          set({ isLoading: true });
          await logout().catch(() => undefined);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          localStorage.removeItem('user');
        } catch (error) {
          console.error('Failed to clear authentication:', error);
          set({ isLoading: false });
        }
      },
      updateUserAvatar: (avatarUrl: string) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ avatarUrl: avatarUrl });
      },
      loadAuth: async () => {
        try {
          set({ isLoading: true });
          const userData = localStorage.getItem('user');
          const tokens = localStorage.getItem('tokens');
          if (!userData && !tokens) {
            set({ isLoading: false });
            return;
          }

          const user = JSON.parse(userData!) as UserProfileRes;
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to load authentication:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        avatarUrl: state.avatarUrl,
      }),
      onRehydrateStorage: () => (state) => {
        // This runs when Zustand finishes loading from storage
        state?.setHasHydrated(true);
      },
    },
  ),
);
