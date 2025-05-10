package com.areeb.eventbooking.common.refreshToken;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.areeb.eventbooking.user.User;

@Component
public class RefreshTokenMapper {
    RefreshToken toRefreshToken(String token, User user, Date expireDate) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(expireDate);
        return refreshToken;
    }

}
