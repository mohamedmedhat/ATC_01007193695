package com.areeb.eventbooking.user;

import java.util.UUID;

import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

public interface UserService {
    LoginResponseDto login(LoginRequestDto request);
    RegisterResponseDto register(RegisterRequestDto request);
    User getUser(UUID id); 
}
