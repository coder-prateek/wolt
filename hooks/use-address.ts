import * as Location from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


import zustandStorage from "@/utils/zustand-storage";
interface UseAddressResult {
    name?: string;
    city: string;
    state: string;
    country: string;
    currentAddress: string;
    setAddress?: (latitude: number, longitude: number) => Promise<void>;
    getCurrentAddress?: () => Promise<void>;
    setCurrentAddress?: (address: string) => void;
}

const inistialState: Omit<UseAddressResult, 'setAddress' | 'getCurrentAddress' | 'setCurrentAddress'> = {
    name: '',
    city: '',
    state: '',
    country: '',
    currentAddress: '',
}
const useAddressStore = create<UseAddressResult>()(
    persist(
        (set) => ({
            ...inistialState,
            setAddress: async (latitude: number, longitude: number) => {
                try {
                    const responce = await Location.reverseGeocodeAsync({ latitude, longitude });
                    if (responce.length > 0) {
                        const { name, city, region, country, formattedAddress } = responce[0];

                        set({
                            name: name ?? '',
                            city: city ?? '',
                            state: region ?? '',
                            country: country ?? '',
                            currentAddress: formattedAddress ?? ''
                        });
                    }
                } catch (error) {
                    console.error('Error fetching address:', error);
                }
            },

        }),
        {
            name: "address",
            storage: createJSONStorage(() => zustandStorage),
        }
    )
)

export default useAddressStore;