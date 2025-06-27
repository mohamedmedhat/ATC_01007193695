package com.areeb.eventbooking.user.service.auth;

import com.areeb.eventbooking.common.refreshToken.dto.response.RefreshTokenResponseDto;
import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserAuthService {
    LoginResponseDto login(LoginRequestDto request);

    RegisterResponseDto register(RegisterRequestDto request);

    void logout(HttpServletRequest request, HttpServletResponse response);

    RefreshTokenResponseDto refreshToken(HttpServletRequest request, HttpServletResponse response);
}
