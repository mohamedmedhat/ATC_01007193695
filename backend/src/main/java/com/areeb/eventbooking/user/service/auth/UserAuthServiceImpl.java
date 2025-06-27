package com.areeb.eventbooking.user.service.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.common.refreshToken.RefreshTokenService;
import com.areeb.eventbooking.common.refreshToken.dto.response.RefreshTokenResponseDto;
import com.areeb.eventbooking.common.refreshToken.exceptions.InvalidTokenException;
import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.user.UserMapper;
import com.areeb.eventbooking.user.UserRepository;
import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;
import com.areeb.eventbooking.user.exception.EmailNotValidException;
import com.areeb.eventbooking.user.exception.InvalidCredentialsException;
import com.areeb.eventbooking.user.service.query.UserQueryService;
import com.areeb.eventbooking.util.CookieUtil;
import com.areeb.eventbooking.util.EncryptionUtil;
import com.areeb.eventbooking.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAuthServiceImpl implements UserAuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EncryptionUtil encryptionService;
    private final RefreshTokenService refreshTokenService;
    private final UserQueryService userQueryService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = this.userQueryService.getUserByEmail(request.email());

        boolean isPasswordValid = this.encryptionService.comparePassword(request.password(), user.getPassword());
        if (!Boolean.TRUE.equals(isPasswordValid)) {
            throw new InvalidCredentialsException("Login failed, invalid credentials");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        String token = jwtUtil.generateToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        refreshTokenService.saveOrUpdateRefreshToken(user, refreshToken);
        cookieUtil.setInCookie(refreshToken);

        return userMapper.toLoginResponseDto(user, token, refreshToken);
    }

    @Override
    public RegisterResponseDto register(RegisterRequestDto request) {
        if (this.userQueryService.existsByEmail(request.email())) {
            throw new EmailNotValidException("bad credentials");
        }
        String encryptedPassword = encryptionService.encodePassword(request.password());
        User user = this.userMapper.toUser(request, encryptedPassword);
        User savedUser = this.userRepository.save(user);
        return this.userMapper.toRegisterResponseDto(savedUser);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = cookieUtil.getRefreshTokenFromCookie(request);
        if (refreshToken != null) {
            refreshTokenService.deleteByToken(refreshToken);
        }
        cookieUtil.clearRefreshTokenCookie(response);
    }

    @Override
    public RefreshTokenResponseDto refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = cookieUtil.getRefreshTokenFromCookie(request);
        if (refreshToken == null) {
            throw new InvalidTokenException("Refresh token not found");
        }

        if (!jwtUtil.isTokenValid(refreshToken)) {
            throw new InvalidTokenException("Refresh token is invalid or expired");
        }

        String email = jwtUtil.extractEmail(refreshToken);
        User user = this.userQueryService.getUserByEmail(email);

        String newAccessToken = jwtUtil.generateToken(user);

        String newRefreshToken = jwtUtil.generateRefreshToken(user);
        refreshTokenService.saveOrUpdateRefreshToken(user, newRefreshToken);
        cookieUtil.setInCookie(newRefreshToken);

        return new RefreshTokenResponseDto(newAccessToken, newRefreshToken);
    }

}
