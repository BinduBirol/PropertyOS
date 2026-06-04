package com.bnroll.auth.controller;

import com.bnroll.auth.dto.LoginRequest;
import com.bnroll.auth.dto.LoginResponse;
import com.bnroll.auth.dto.RegisterRequest;
import com.bnroll.auth.security.ratelimit.RateLimit;
import com.bnroll.auth.service.AuthService;
import com.bnroll.commercedomain.entity.user.User;
import com.bnroll.common.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/v1/login")
    @RateLimit(limit = 5, durationSeconds = 60)
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ApiResponse.<LoginResponse>builder()
                .success(true)
                .data(response)
                .timestamp(LocalDateTime.now())
                .version("v1")
                .path("/auth/login")
                .build();
    }

    @PostMapping("/v1/register")
    @RateLimit(limit = 5, durationSeconds = 60)
    public ApiResponse<String> register(@RequestBody RegisterRequest request) {

        User user = authService.register(request);

        return ApiResponse.<String>builder()
                .success(true)
                .data("User registered successfully")
                .timestamp(LocalDateTime.now())
                .version("v1")
                .path("/auth/register")
                .correlationId(String.valueOf(user.getId()))
                .build();
    }
}