import { Api } from "@/lib/api";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const useAddressCreateMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await Api.post('/address', data);
            return res.data
        },
        ...options,
    });
}


export const useUpdateAddressMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await Api.patch('/address', data);
            return res.data as TData;
        },
        ...options,
    });
}


export const useSetDefaultAddressMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await Api.patch('/address/default', data);
            return res.data as TData;
        },
        ...options,
    });

}