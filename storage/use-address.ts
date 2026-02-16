import * as Location from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


import zustandStorage from "@/storage/zustand-storage";
interface UseAddressResult {
    name?: string;
    city: string;
    state: string;
    country: string;
    currentAddress: string;
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
    setAddress?: (latitude: number, longitude: number, latitudeDelta?: number, longitudeDelta?: number) => Promise<void>;
}
const inistialState: Omit<UseAddressResult, 'setAddress' | 'getCurrentAddress' | 'setCurrentAddress'> = {
    name: '',
    city: '',
    state: '',
    country: '',
    currentAddress: '',
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: undefined,
    longitudeDelta: undefined,

}
const useAddressStore = create<UseAddressResult>()(
    persist(
        (set) => ({
            ...inistialState,
            setAddress: async (latitude: number, longitude: number, latitudeDelta?: number, longitudeDelta?: number) => {
                try {
                    const responce = await Location.reverseGeocodeAsync({ latitude, longitude });
                    if (responce.length > 0) {
                        const { name, city, region, country, formattedAddress } = responce[0];

                        set({
                            name: name ?? '',
                            city: city ?? '', state: region ?? '', country: country ?? '', currentAddress: formattedAddress ?? '', latitude: latitude, longitude: longitude, latitudeDelta: latitudeDelta || 0.05, longitudeDelta: longitudeDelta || 0.05,
                        });
                    }
                } catch (error) { console.error('Error fetching address:', error); }
            },
        }), { name: "address", storage: createJSONStorage(() => zustandStorage), }))

export default useAddressStore;