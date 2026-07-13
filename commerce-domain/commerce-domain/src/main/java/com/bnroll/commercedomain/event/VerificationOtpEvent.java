package com.bnroll.commercedomain.event;


import com.bnroll.commercedomain.enums.VerificationPurpose;

public record VerificationOtpEvent(
        Long userId,
        String email,
        String phone,
        String otp,
        VerificationPurpose purpose
) {
}