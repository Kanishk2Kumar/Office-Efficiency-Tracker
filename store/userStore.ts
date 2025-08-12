import { create } from "zustand";

interface UserState {
  id?: string;
  email?: string;
  levelOfAccess?: string;
  details?: any;
  setUser: (userData: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  id: undefined,
  email: undefined,
  levelOfAccess: undefined,
  details: undefined,
  setUser: (userData) => set(userData),
  clearUser: () => set({ id: undefined, email: undefined, levelOfAccess: undefined, details: undefined }),
}));

export default useUserStore;
