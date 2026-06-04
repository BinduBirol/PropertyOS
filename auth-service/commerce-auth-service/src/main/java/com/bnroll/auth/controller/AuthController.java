package com.bnroll.auth.controller;

import com.bnroll.auth.dto.LoginRequest;
import com.bnroll.auth.dto.LoginResponse;
import com.bnroll.auth.dto.RegisterRequest;
import com.bnroll.auth.service.AuthService;
import com.bnroll.common.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/v1/login")
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
    public ApiResponse<String> register(@RequestBody RegisterRequest request) {

        authService.register(request);

        return ApiResponse.<String>builder()
                .success(true)
                .data("User registered successfully")
                .timestamp(LocalDateTime.now())
                .version("v1")
                .path("/auth/register")
                .build();
    }
}