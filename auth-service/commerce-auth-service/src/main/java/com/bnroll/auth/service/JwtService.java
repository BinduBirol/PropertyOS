package com.bnroll.auth.service;

import com.bnroll.auth.repository.RefreshTokenRepository;
import com.bnroll.auth.security.JwtUtil;
import com.bnroll.commercedomain.entity.auth.RefreshToken;
import com.bnroll.commercedomain.entity.user.RoleName;
import com.bnroll.commercedomain.entity.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.access-token.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    public String createAccessToken(User user, RoleName role) {

        return jwtUtil.generateAccessToken(
                user.getEmail(),
                role.name()
        );
    }

    public String createRefreshToken(User user) {
        Instant now = Instant.now();
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        RefreshToken entity = RefreshToken.builder()
                .tokenHash(DigestUtils.sha256Hex(refreshToken))
                .sessionId(UUID.randomUUID().toString())
                .user(user)
                .createdAt(now)
                .expiresAt(now.plusMillis(refreshTokenExpiration))
                .revoked(false)
                .build();

        refreshTokenRepository.save(entity);

        return refreshToken;
    }

    @Transactional
    public String rotateRefreshToken(RefreshToken storedToken) {

        String newRefreshToken =
                jwtUtil.generateRefreshToken(storedToken.getUser().getEmail());

        storedToken.setTokenHash(DigestUtils.sha256Hex(newRefreshToken));
        storedToken.setLastUsedAt(Instant.now());
        storedToken.setExpiresAt(
                Instant.now().plusMillis(refreshTokenExpiration)
        );
        storedToken.setRevoked(false);

        refreshTokenRepository.save(storedToken);

        return newRefreshToken;
    }

    @Transactional
    public void revokeAllSessions(User user) {

        refreshTokenRepository.revokeAllByUserId(
                user.getId(),
                Instant.now()
        );
    }
}