package com.bnroll.auth.repository;

import com.bnroll.commercedomain.entity.password.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    @Modifying
    @Query("""
                UPDATE PasswordResetToken t
                   SET t.used = true,
                       t.usedAt = :usedAt
                 WHERE t.user.id = :userId
                   AND t.used = false
            """)
    void invalidateAllByUserId(Long userId, Instant usedAt);
}