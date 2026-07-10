package com.bnroll.auth.repository;

import com.bnroll.commercedomain.entity.auth.RefreshToken;
import com.bnroll.commercedomain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    List<RefreshToken> findByUser(User user);

    void deleteByUser(User user);


    @Modifying
    @Query("""
                UPDATE RefreshToken rt
                   SET rt.revoked = true,
                       rt.revokedAt = :revokedAt
                 WHERE rt.user.id = :userId
                   AND rt.revoked = false
            """)
    void revokeAllByUserId(
            Long userId,
            Instant revokedAt
    );
}