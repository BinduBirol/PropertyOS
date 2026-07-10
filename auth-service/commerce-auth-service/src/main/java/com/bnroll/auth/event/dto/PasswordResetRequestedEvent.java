package com.bnroll.auth.event.dto;

import com.bnroll.commercedomain.entity.user.LoginType;

import java.time.LocalDateTime;

public record PasswordResetRequestedEvent(
        Long id,
        String email,
        String phone,
        LoginType loginType,
        String resetToken,
        LocalDateTime requestedAt
) {
}