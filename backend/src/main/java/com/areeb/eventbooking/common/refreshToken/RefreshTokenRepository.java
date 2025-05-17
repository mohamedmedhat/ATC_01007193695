package com.areeb.eventbooking.common.refreshToken;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByUserId(UUID id);
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
}
