package com.areeb.eventbooking.user.dto.response;

import java.util.Set;
import java.util.UUID;

import com.areeb.eventbooking.shared.enums.Role;

public record LoginResponseDto(
        UUID id,
        String name,
        String email,
        Set<Role> roles,
        String access_token,
        String refresh_token) {

}
