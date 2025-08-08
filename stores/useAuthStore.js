import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  userType: null,

  setUser: (user) => set({ user }),
  setUserType: (type) => set({ userType: type }),

  clearAuth: () => set({ user: null, userType: null }),
}));

export default useAuthStore;