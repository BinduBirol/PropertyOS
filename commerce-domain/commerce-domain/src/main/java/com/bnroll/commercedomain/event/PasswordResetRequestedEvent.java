package com.bnroll.commercedomain.event;



import com.bnroll.commercedomain.enums.user.LoginType;

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