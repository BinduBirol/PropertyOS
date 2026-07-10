package com.bnroll.auth.service;

import com.bnroll.auth.exception.AuthException;
import com.bnroll.auth.repository.PasswordResetTokenRepository;
import com.bnroll.auth.security.JwtUtil;
import com.bnroll.commercedomain.entity.password.PasswordResetToken;
import com.bnroll.commercedomain.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final JwtUtil jwtUtil;

    @Value("${jwt.password-reset-token.expiration}")
    private long passwordResetTokenExpiration;

    @Transactional
    public String createPasswordResetToken(User user) {

        passwordResetTokenRepository.invalidateAllByUserId(
                user.getId(),
                Instant.now()
        );

        String token = jwtUtil.generatePasswordResetToken(user.getEmail());

        PasswordResetToken entity = PasswordResetToken.builder()
                .tokenHash(DigestUtils.sha256Hex(token))
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(
                        Instant.now().plusMillis(passwordResetTokenExpiration)
                )
                .used(false)
                .build();

        passwordResetTokenRepository.save(entity);



        return token;
    }

    @Transactional(readOnly = true)
    public PasswordResetToken validateToken(String token) {

        PasswordResetToken storedToken = passwordResetTokenRepository
                .findByTokenHash(DigestUtils.sha256Hex(token))
                .orElseThrow(() ->
                        new AuthException(
                                "password.reset.token.invalid",
                                HttpStatus.BAD_REQUEST
                        ));

        if (storedToken.isUsed()) {
            throw new AuthException(
                    "password.reset.token.used",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (storedToken.getExpiresAt().isBefore(Instant.now())) {
            throw new AuthException(
                    "password.reset.token.expired",
                    HttpStatus.BAD_REQUEST
            );
        }

        if (!jwtUtil.isTokenValid(
                token,
                storedToken.getUser().getEmail()
        )) {
            throw new AuthException(
                    "password.reset.token.invalid",
                    HttpStatus.BAD_REQUEST
            );
        }

        return storedToken;
    }

    @Transactional
    public void markAsUsed(PasswordResetToken token) {

        token.setUsed(true);
        token.setUsedAt(Instant.now());
    }
}