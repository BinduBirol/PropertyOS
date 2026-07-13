package com.bnroll.commercedomain.event;



import com.bnroll.commercedomain.enums.user.RoleName;

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