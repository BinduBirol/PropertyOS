import { LoginResponse } from "src/auth/auth";
import api from "./axios";

export interface LoginRequest {
    identifier: string;
    password: string;
    role: string;
    loginType: string;
}

// src/types/api.ts

export interface ApiError {
    code: string;
    message: string;
    status: number;
    fieldErrors?: Record<string, string> | null;
    service: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error: ApiError | null;
    meta: unknown;
    timestamp: string;
    path: string;
    correlationId: string | null;
    version: string;
}



export async function login(request: LoginRequest) {
    const response = await api.post<ApiResponse<LoginResponse>>(
        "/v1/login",
        request
    );

    return response.data;
}