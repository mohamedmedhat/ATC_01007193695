package com.areeb.eventbooking.user;

import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.common.refreshToken.RefreshTokenService;
import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;
import com.areeb.eventbooking.user.exception.EmailNotValidException;
import com.areeb.eventbooking.user.exception.InvalidCredentialsException;
import com.areeb.eventbooking.user.exception.UserNotFoundException;
import com.areeb.eventbooking.util.CookieUtil;
import com.areeb.eventbooking.util.EncryptionUtil;
import com.areeb.eventbooking.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EncryptionUtil encryptionService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        User user = getUserByEmail(request.email());

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
        if (existsByEmail(request.email())) {
            throw new EmailNotValidException("bad credentials");
        }
        String encryptedPassword = encryptionService.encodePassword(request.password());
        User user = this.userMapper.toUser(request, encryptedPassword);
        User savedUser = this.userRepository.save(user);
        return this.userMapper.toRegisterResponseDto(savedUser);
    }

    @Override
    public User getUser(UUID id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("user with id: " + id + "not found"));
    }

    public boolean existsByEmail(String email) {
        return this.userRepository.countByEmail(email) > 0;
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("user with email" + email + "not found"));
    }

}
