package com.bnroll.property.security;

public record UserPrincipal(
        Long id,
        String email,
        String phone,
        String role
) {
}