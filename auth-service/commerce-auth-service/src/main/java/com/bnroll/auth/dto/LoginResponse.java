package com.bnroll.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class LoginResponse {

    // 🔐 JWT token
    private String token;

    private String tokenType;

    // ⏱ token metadata
    private long issuedAt;      // epoch millis
    private long expiresAt;     // epoch millis
    private long expiresIn;     // seconds

    public static LoginResponse of(String token, long issuedAt, long expiresAt) {
        return new LoginResponse(
                token,
                "Bearer",
                issuedAt,
                expiresAt,
                (expiresAt - issuedAt) / 1000
        );
    }
}