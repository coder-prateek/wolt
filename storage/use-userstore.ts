import zustandStorage from "@/storage/zustand-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';


interface CustomLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface UserStore {
  isGuest: boolean;
  user: any;
  token: string | null;
  location: CustomLocation | null;
  outOfRange: boolean;
  setIsGuest: (isGuest: boolean) => void;
  setUser: (user: any) => any;
  setOutOfRange: (outOfRange: boolean) => void;
  setLocation: (location: CustomLocation | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isGuest: false,
      user: null,
      token: null,
      location: null,
      outOfRange: false,
      setLocation: (location: CustomLocation | null) => set({ location }),
      setOutOfRange: (outOfRange: boolean) => set({ outOfRange }),
      setIsGuest: (isGuest: boolean) => set({ isGuest }),
      setUser: (user: any) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      clearAuth: () => set({ user: null, token: null, isGuest: false, outOfRange: false, location: null }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useUserStore;
