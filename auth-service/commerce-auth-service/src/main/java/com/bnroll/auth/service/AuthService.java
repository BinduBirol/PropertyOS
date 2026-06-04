package com.bnroll.auth.service;


import com.bnroll.auth.dto.LoginRequest;
import com.bnroll.auth.dto.LoginResponse;
import com.bnroll.auth.dto.RegisterRequest;
import com.bnroll.auth.exception.AuthException;
import com.bnroll.auth.repository.UserRepository;
import com.bnroll.auth.security.JwtUtil;
import com.bnroll.commercedomain.entity.user.LocaleCode;
import com.bnroll.commercedomain.entity.user.User;
import com.bnroll.common.i18n.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("user.not.found", HttpStatus.NOT_FOUND));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("invalid.password", HttpStatus.UNAUTHORIZED);
        }

        String role = user.getRoles().iterator().next().getName().name();

        long issuedAt = System.currentTimeMillis();
        long expiresIn = 3600_000;
        long expiresAt = issuedAt + expiresIn;

        String token = jwtUtil.generateToken(user.getEmail(), role);

        return new LoginResponse(
                token,
                "Bearer",
                issuedAt,
                expiresAt,
                expiresIn / 1000
        );
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("email.already.exists", HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());

        return userRepository.save(user);
    }
}