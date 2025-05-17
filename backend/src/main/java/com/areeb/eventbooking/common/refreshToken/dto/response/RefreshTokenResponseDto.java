package com.areeb.eventbooking.common.refreshToken.dto.response;

public record RefreshTokenResponseDto(
        String accessToken,
        String refreshToken) {

}
