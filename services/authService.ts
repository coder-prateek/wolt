import { AuthResponse, ForgotPasswordResponse, LoginRequest, SignupRequest } from "@/type";
import { Api } from "../lib/api";



export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await Api.post(`/auth/signin`, data,);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await Api.post(`/auth/signup`, data);
    return response.data;
  },

  verifyAccount: async (data: { otp: string }): Promise<AuthResponse> => {
    const response = await Api.post(`/auth/verify`, data);
    return response.data;
  },

  sendVerificationCode: async (data: { phone: string }): Promise<void> => {
    const response = await Api.post(`/auth/account/send-otp`, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const response = await Api.post(`/auth/signout`, null, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --- IGNORE ---
      },
    });


    return response.data;
  },

  refreshToken: async (): Promise<void> => {
    const response = await Api.post(`/auth/refresh`, null);
    return response.data;
  },


  forgotPassword: async (data: { phone: string }): Promise<ForgotPasswordResponse> => {
    const response = await Api.post(`/auth/forgot-password`, data);
    return response.data;
  },

  resetPassword: async (data: { token: string; newPassword: string }): Promise<void> => {
    const response = await Api.post(`/auth/password/reset`, data);
    return response.data;
  }
};
export { LoginRequest, SignupRequest };

