package com.bnroll.auth.service;


import com.bnroll.auth.dto.LoginRequest;
import com.bnroll.auth.dto.LoginResponse;
import com.bnroll.auth.dto.RegisterRequest;
import com.bnroll.auth.exception.AuthException;
import com.bnroll.auth.repository.UserRepository;
import com.bnroll.auth.security.JwtUtil;
import com.bnroll.commercedomain.entity.user.LocaleCode;
import com.bnroll.commercedomain.entity.user.RoleName;
import com.bnroll.commercedomain.entity.user.User;
import com.bnroll.common.i18n.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request, Locale locale) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("user.not.found", HttpStatus.NOT_FOUND));

        RoleName requestedRole;
        try {
            requestedRole = RoleName.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new AuthException("invalid.role", HttpStatus.BAD_REQUEST);
        }

        if (!user.getRoles().contains(requestedRole)) {
            throw new AuthException("role.not.assigned", HttpStatus.FORBIDDEN);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("invalid.password", HttpStatus.UNAUTHORIZED);
        }

        long issuedAt = System.currentTimeMillis();
        long expiresIn = 3600_000L;
        long expiresAt = issuedAt + expiresIn;

        String token = jwtUtil.generateToken(user.getEmail(), requestedRole.name());

        return new LoginResponse(
                token,
                "Bearer",
                requestedRole.name(),
                issuedAt,
                expiresAt,
                expiresIn / 1000
        );
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("email.already.exists", HttpStatus.CONFLICT);
        }

        RoleName role;
        try {
            role = RoleName.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new AuthException("invalid.role", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setRoles(Set.of(role));

        return userRepository.save(user);
    }
}