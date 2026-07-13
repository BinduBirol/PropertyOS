package com.bnroll.commercedomain.event;



import com.bnroll.commercedomain.enums.user.LoginType;

import java.time.LocalDateTime;

public record LoginFailedEvent(
        String identifier,
        LoginType loginType,
        String ipAddress,
        String userAgent,
        String reason,
        LocalDateTime attemptTime
) {}