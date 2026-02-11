import { authService, LoginRequest, SignupRequest } from "@/services/authService";
import useUserStore from "@/storage/use-userstore";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const useLoginMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await authService.login(data as LoginRequest);
            return res.data as TData;

        },

        ...options,
    })


};

export const useSignupMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await authService.signup(data as SignupRequest);
            return res.data as TData;
        },
        ...options,
    });
};


export const useAccountVerificationMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await authService.verifyAccount(data as { otp: string });
            return res as TData;
        },
        ...options,
    })
}

export const useSendVerificationCodeMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await authService.sendVerificationCode(data as { phone: string });
            return res as TData;
        },
        ...options,
    })
}

export const useLogoutMutation = () => {
    const { clearAuth } = useUserStore();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            clearAuth()
        },
        onError: () => {
            clearAuth()
        },
    });
};

export const useForgotPasswordMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            const res = await authService.forgotPassword(data as { phone: string });
            return res as TData
        },
        ...options,
    });
}


export const usePasswordResetMutation = <TData, TVariables>(options?: MutationOptions<TData, Error, TVariables>) => {
    return useMutation({
        mutationFn: async (data: TVariables) => {
            // Implement password reset logic here, e.g., call authService.resetPassword(data)
            // For now, we can just return a placeholder response
            return {} as TData;
        },
        ...options,
    });
}
