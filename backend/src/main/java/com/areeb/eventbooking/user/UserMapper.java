package com.areeb.eventbooking.user;

import org.springframework.stereotype.Component;

import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

@Component
public class UserMapper {

    RegisterResponseDto toRegisterResponseDto(User user) {
        return new RegisterResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRoles());
    }

    LoginResponseDto toLoginResponseDto(User user, String access_token, String refresh_token) {
        return new LoginResponseDto(
                user.getId(),
                access_token,
                refresh_token);
    }

    User toUser(RegisterRequestDto data) {
        RegisterRequestDto sanitizedData = RegisterRequestDto.sanitize(data);
        User user = new User();
        user.setName(sanitizedData.name());
        user.setEmail(sanitizedData.email());
        user.setPassword(sanitizedData.password());
        user.setRoles(sanitizedData.roles());
        return user;
    }
}
