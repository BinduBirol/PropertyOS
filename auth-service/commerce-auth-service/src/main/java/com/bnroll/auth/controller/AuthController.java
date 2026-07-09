package com.bnroll.auth.controller;

import com.bnroll.auth.dto.LoginRequest;
import com.bnroll.auth.dto.LoginResponse;
import com.bnroll.auth.dto.RefreshTokenRequest;
import com.bnroll.auth.dto.RegisterRequest;
import com.bnroll.auth.exception.AuthException;
import com.bnroll.auth.security.ratelimit.RateLimit;
import com.bnroll.auth.service.AuthService;
import com.bnroll.commercedomain.entity.user.User;
import com.bnroll.common.dto.response.ApiResponse;
import com.bnroll.common.i18n.MessageService;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Locale;

@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication APIs")
public class AuthController {

    private final AuthService authService;

    private final MessageService messageService;

    @PostMapping("/v1/login")
    @RateLimit(limit = 5, durationSeconds = 60)
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request, Locale locale,
                                            HttpServletRequest httpRequest) {

        LoginResponse response = authService.login(request, locale);

        return ApiResponse.<LoginResponse>builder()
                .success(true)
                .data(response)
                .timestamp(LocalDateTime.now())
                .version("v1")
                .path(httpRequest.getRequestURI())
                .build();
    }

    @PostMapping("/v1/refresh")
    public LoginResponse refresh(
            @Valid @RequestBody RefreshTokenRequest request) {
        return authService.refresh(request);
    }

    @GetMapping("/v1/me")
    public ResponseEntity<?> me(Authentication authentication) {
        return ResponseEntity.ok().build();
    }


    @PostMapping("/v1/register")
    @RateLimit(limit = 5, durationSeconds = 60)
    public ApiResponse<String> register(@Valid @RequestBody RegisterRequest request, Locale locale,
                                        HttpServletRequest httpRequest) {

        User user = authService.register(request);

        return ApiResponse.<String>builder()
                .success(true)
                .data(messageService.get("user.register.success", locale))
                .timestamp(LocalDateTime.now())
                .version("v1")
                .path(httpRequest.getRequestURI())
                .correlationId(String.valueOf(user.getId()))
                .build();
    }
}