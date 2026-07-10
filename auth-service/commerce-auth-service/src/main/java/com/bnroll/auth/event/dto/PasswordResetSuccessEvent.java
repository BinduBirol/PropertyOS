package com.bnroll.auth.event.dto;

import java.time.LocalDateTime;

public record PasswordResetSuccessEvent(
        Long id,
        String email,
        String phone,
        LocalDateTime resetAt
) {
}