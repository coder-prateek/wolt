import { Api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const useGetProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await Api.get('/profile')
            return res.data;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}