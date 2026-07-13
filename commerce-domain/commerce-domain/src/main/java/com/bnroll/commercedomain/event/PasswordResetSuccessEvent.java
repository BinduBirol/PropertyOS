package com.bnroll.commercedomain.event;

import java.time.LocalDateTime;

public record PasswordResetSuccessEvent(
        Long id,
        String email,
        String phone,
        LocalDateTime resetAt
) {
}