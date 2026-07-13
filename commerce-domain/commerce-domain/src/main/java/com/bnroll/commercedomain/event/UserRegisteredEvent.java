package com.bnroll.commercedomain.event;

public record UserRegisteredEvent(
        Long userId,
        String email,
        String phone,
        String firstName

) {
}

