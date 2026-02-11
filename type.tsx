


export interface LoginResponse {
    id: number;
    name: string;
    phone: string;
    access_token: string;
    refresh_token: string;
}





// Auth Request and Response Types

export interface LoginRequest {
    phone: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface AuthResponse {
    data: {
        id: number;
        name: string;
        phone: string;
        access_token: string;
        refresh_token: string;
    }
}

export interface ForgotPasswordRequest {
    phone: string;
}

export interface ForgotPasswordResponse {
    token: string;
    message: string;
    success: boolean;
}

export interface ResetPasswordRequest {
    password: string;
    confirmPassword: string;
    otp: string;
}

export interface ResetPasswordResponse {
    message: string;
    success: boolean;
    data: string
}