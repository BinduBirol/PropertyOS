package com.bnroll.commercedomain.event;



import com.bnroll.commercedomain.enums.user.LoginType;

import java.time.LocalDateTime;

public record LoginSuccessEvent(
        Long userId,
        String email,
        String phone,
        String firstName,
        LoginType loginType,
        String ipAddress,
        String userAgent,
        LocalDateTime loginTime
) {}