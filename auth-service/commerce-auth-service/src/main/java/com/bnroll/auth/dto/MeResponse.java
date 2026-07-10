package com.bnroll.auth.dto;

import com.bnroll.commercedomain.entity.user.RoleName;

import java.util.Set;

public record MeResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phone,
        Set<RoleName> roles
) {
}