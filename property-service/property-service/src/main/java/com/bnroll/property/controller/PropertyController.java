package com.bnroll.property.controller;

import com.bnroll.property.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PropertyController {

    @GetMapping("/my")
    public String test(
            Authentication authentication
    ) {

        UserPrincipal user =
                (UserPrincipal) authentication.getPrincipal();


        return """
                User ID: %s
                Email: %s
                Phone: %s
                Role: %s
                """.formatted(
                user.id(),
                user.email(),
                user.phone(),
                user.role()
        );
    }

}
