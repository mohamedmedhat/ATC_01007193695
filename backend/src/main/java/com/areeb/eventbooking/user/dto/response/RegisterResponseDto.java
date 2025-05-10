package com.areeb.eventbooking.user.dto.response;

import com.areeb.eventbooking.shared.enums.Role;

import java.util.Set;
import java.util.UUID;

public record RegisterResponseDto(
        UUID id,
        String name,
        String email,
        Set<Role> roles
) {
}
