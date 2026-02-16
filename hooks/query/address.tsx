import { Api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface SavedAddress {
    _id: string;
    label: string;
    address: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
}

export const useGetAddressesQuery = () => {
    return useQuery<SavedAddress[]>({
        queryKey: ['addresses'],
        queryFn: async () => {
            const res = await Api.get('/address');
            return res.data;
        },
    });
}
