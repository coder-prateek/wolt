import zustandStorage from "@/storage/zustand-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';


interface CustomLocation {
    latitude: number;
    longitude: number;
    address: string;
    heading: string;
}

interface DeleveryPartnerStore {
    user: any;
    token: string | null;
    location: CustomLocation | null;
    onDuty: boolean;
    setUser: (user: any) => any;
    setOnDuty: (onDuty: boolean) => void;
    setLocation: (location: CustomLocation | null) => void;
    setToken: (token: string | null) => void;
    clearAuth: () => void;
}

const useDeliveryPartnerStore = create<DeleveryPartnerStore>()(
    persist(
        (set) => ({
            isGuest: false,
            user: null,
            token: null,
            location: null,
            onDuty: false,
            setLocation: (location: CustomLocation | null) => set({ location }),
            setOnDuty: (onDuty: boolean) => set({ onDuty }),

            setUser: (user: any) => set({ user }),
            setToken: (token: string | null) => set({ token }),
            clearAuth: () => set({ user: null, token: null, onDuty: false, location: null, }),
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => zustandStorage),
        }
    )
);

export default useDeliveryPartnerStore;
