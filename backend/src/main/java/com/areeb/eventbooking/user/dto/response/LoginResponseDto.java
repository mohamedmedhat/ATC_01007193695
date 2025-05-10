package com.areeb.eventbooking.user.dto.response;

import java.util.UUID;

public record LoginResponseDto(
        UUID id,
        String access_token,
        String refresh_token) {

}
