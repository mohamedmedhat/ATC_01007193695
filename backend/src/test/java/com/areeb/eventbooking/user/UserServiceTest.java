package com.areeb.eventbooking.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.security.authentication.AuthenticationManager;

import com.areeb.eventbooking.common.refreshToken.RefreshTokenService;
import com.areeb.eventbooking.shared.enums.Role;
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

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private JwtUtil JwtUtil;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Mock
    private EncryptionUtil encryptionService;

    private UUID id;

    @BeforeEach
    void setUp() {
        id = UUID.randomUUID();
    }

    @Test
    void shouldRegisterSuccessfullyWithValidData() {
        RegisterRequestDto dto = new RegisterRequestDto("User", "user@mail.com", "password123", Set.of());

        String encryptedPassword = "encodedPass";

        User user = new User(id, "User", "user@mail.com", encryptedPassword, Set.of(Role.USER), LocalDateTime.now());

        when(userRepository.countByEmail("user@mail.com")).thenReturn(0L);
        when(encryptionService.encodePassword("password123")).thenReturn(encryptedPassword);
        when(userMapper.toUser(dto, encryptedPassword)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toRegisterResponseDto(user))
                .thenReturn(new RegisterResponseDto(user.getId(), user.getName(), user.getEmail(), user.getRoles()));

        RegisterResponseDto response = userServiceImpl.register(dto);

        assertEquals("user@mail.com", response.email());
        assertEquals("User", response.name());
    }

    @Test
    void shouldFailIfUserIsAlreadyExist() {
        RegisterRequestDto dto = new RegisterRequestDto("User", "user@mail.com", "password123", Set.of());

        when(userRepository.countByEmail("user@mail.com")).thenReturn(1L);

        assertThrows(EmailNotValidException.class, () -> userServiceImpl.register(dto));
    }

    @Test
    void shouldLoginSuccessfullyWithCorrectCredential() {
        LoginRequestDto dto = new LoginRequestDto("user@mail.com", "password123");
        User user = new User(id, "User", "user@mail.com", "hashedPassword", Set.of(Role.USER), LocalDateTime.now());

        when(userRepository.findByEmail("user@mail.com")).thenReturn(Optional.of(user));
        when(encryptionService.comparePassword("password123", "hashedPassword")).thenReturn(true);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(Authentication.class));

        when(JwtUtil.generateToken(user)).thenReturn("jwt-token");
        when(JwtUtil.generateRefreshToken(user)).thenReturn("refresh-token");

        RefreshTokenService refreshTokenService = mock(RefreshTokenService.class);
        ReflectionTestUtils.setField(userServiceImpl, "refreshTokenService", refreshTokenService);

        CookieUtil cookieUtil = mock(CookieUtil.class);
        ReflectionTestUtils.setField(userServiceImpl, "cookieUtil", cookieUtil);

        when(userMapper.toLoginResponseDto(user, "jwt-token", "refresh-token"))
                .thenReturn(new LoginResponseDto(id, "jwt-token", "refresh-token"));

        LoginResponseDto response = userServiceImpl.login(dto);

        assertEquals("jwt-token", response.access_token());
        assertEquals("refresh-token", response.refresh_token());
        assertEquals(id, response.id());
    }

    @Test
    void shouldFailIfEmailOrPasswordIsMissing() {
        LoginRequestDto dto = new LoginRequestDto("", "");
        when(userRepository.findByEmail("")).thenThrow(new UserNotFoundException("user with email not found"));
        assertThrows(UserNotFoundException.class, () -> userServiceImpl.login(dto));
    }

    @Test
    void shouldFailLoginWithInvalidCredentials() {
        LoginRequestDto dto = new LoginRequestDto("user@mail.com", "wrongPassword");
        User user = new User(id, "User", "user@mail.com", "correctPassword", Set.of(Role.USER), LocalDateTime.now());

        when(userRepository.findByEmail("user@mail.com")).thenReturn(Optional.of(user));
        when(encryptionService.comparePassword("wrongPassword", "correctPassword")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> userServiceImpl.login(dto));
    }

    @Test
    void shouldReturnUserSuccessfully() {
        User user = new User(id, "User", "user@mail.com", "encodedPass", Set.of(Role.USER), LocalDateTime.now());
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        User result = userServiceImpl.getUser(id);
        assertEquals("User", result.getName());
        assertEquals("user@mail.com", result.getEmail());
    }

    @Test
    void shouldThrowUserNotFoundExceptionWhenFailFindUser() {
        when(userRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userServiceImpl.getUser(id));
    }
}
