package com.areeb.eventbooking.user;


import org.springframework.stereotype.Component;

import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

@Component
public class UserMapper {
    public RegisterResponseDto toRegisterResponseDto(User user) {
        return new RegisterResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles());
    }

    public LoginResponseDto toLoginResponseDto(User user, String access_token, String refresh_token) {
        return new LoginResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles(),
                access_token,
                refresh_token);
    }

    public User toUser(RegisterRequestDto data, String encryptedPassword) {
        RegisterRequestDto sanitizedData = RegisterRequestDto.sanitize(data);
        User user = new User();
        user.setName(sanitizedData.name());
        user.setEmail(sanitizedData.email());
        user.setPassword(encryptedPassword);
        user.setRoles(sanitizedData.roles());
        return user;
    }
}
