export interface LoginRequest {
    identifier: string;
    password: string;
    role: string;
    loginType: string;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    role: string;
    issuedAt: number;
    expiresAt: number;
    expiresIn: number;
}