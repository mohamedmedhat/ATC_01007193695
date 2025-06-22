package com.areeb.eventbooking.user.service.query;

import java.util.UUID;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.user.UserRepository;
import com.areeb.eventbooking.user.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserQueryServiceImpl implements UserQueryService {
    private final UserRepository userRepository;

    @Cacheable(value = "user", key = "#id")
    @Override
    public User getUser(UUID id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("user with id: " + id + " not found"));
    }

    @Override
    public boolean existsByEmail(String email) {
        return this.userRepository.countByEmail(email) > 0;
    }

    @Override
    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("user with email" + email + " not found"));
    }

}
