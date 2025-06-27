package com.areeb.eventbooking.user.service.query;

import java.util.UUID;

import com.areeb.eventbooking.user.User;

public interface UserQueryService {
    User getUser(UUID id);

    boolean existsByEmail(String email);

    User getUserByEmail(String email);
}
