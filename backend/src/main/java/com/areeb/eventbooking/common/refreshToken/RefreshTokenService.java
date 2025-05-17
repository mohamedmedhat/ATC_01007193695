package com.areeb.eventbooking.common.refreshToken;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenMapper refreshTokenMapper;
    private final JwtUtil jwtUtil;

    public void saveOrUpdateRefreshToken(User user, String refreshToken) {
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserId(user.getId());
        if (existingToken.isPresent()) {
            RefreshToken tokenToUpdate = existingToken.get();
            tokenToUpdate.setToken(refreshToken);
            tokenToUpdate.setExpiryDate(jwtUtil.extractExpiration(refreshToken));
            refreshTokenRepository.save(tokenToUpdate);
        } else {
            RefreshToken newToken = refreshTokenMapper.toRefreshToken(refreshToken, user,
                    jwtUtil.extractExpiration(refreshToken));
            refreshTokenRepository.save(newToken);
        }
    }

    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
