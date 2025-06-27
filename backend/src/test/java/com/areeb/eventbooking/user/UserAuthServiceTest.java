package com.areeb.eventbooking.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
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
import com.areeb.eventbooking.user.service.auth.UserAuthServiceImpl;
import com.areeb.eventbooking.user.service.query.UserQueryService;
import com.areeb.eventbooking.util.CookieUtil;
import com.areeb.eventbooking.util.EncryptionUtil;
import com.areeb.eventbooking.util.JwtUtil;

@ExtendWith(MockitoExtension.class)
public class UserAuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserQueryService userQueryService;

    @Mock
    private RefreshTokenService refreshTokenService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private JwtUtil JwtUtil;

    @Mock
    private CookieUtil cookieUtil;

    @InjectMocks
    private UserAuthServiceImpl userServiceImpl;

    @Mock
    private EncryptionUtil encryptionService;

    private UUID id;
    private RegisterRequestDto regRequestDto;
    private LoginRequestDto loginRequestDto;

    @BeforeEach
    void setUp() {
        id = UUID.randomUUID();
        regRequestDto = new RegisterRequestDto("User", "user@mail.com", "password123", Set.of());
        loginRequestDto =  new LoginRequestDto("user@mail.com", "password123");
    }

    @Test
    void shouldRegisterSuccessfullyWithValidData() {
        String encryptedPassword = "encodedPass";
        User user = new User(id, "User", "user@mail.com", encryptedPassword, Set.of(Role.USER), Set.of(),
                LocalDateTime.now());

        when(userQueryService.existsByEmail("user@mail.com")).thenReturn(false);
        when(encryptionService.encodePassword("password123")).thenReturn(encryptedPassword);
        when(userMapper.toUser(regRequestDto, encryptedPassword)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toRegisterResponseDto(user)).thenReturn(
                new RegisterResponseDto(user.getId(), user.getName(), user.getEmail(), user.getRoles()));

        RegisterResponseDto response = userServiceImpl.register(regRequestDto);

        assertEquals("user@mail.com", response.email());
        assertEquals("User", response.name());
    }

    @Test
    void shouldFailIfUserIsAlreadyExist() {
        when(userQueryService.existsByEmail("user@mail.com")).thenReturn(true);
        assertThrows(EmailNotValidException.class, () -> userServiceImpl.register(regRequestDto));
    }

    @Test
    void shouldLoginSuccessfullyWithCorrectCredential() {
        User user = new User(id, "User", "user@mail.com", "hashedPassword", Set.of(Role.USER), Set.of(),
                LocalDateTime.now());

        when(userQueryService.getUserByEmail("user@mail.com")).thenReturn(user);

        when(encryptionService.comparePassword("password123", "hashedPassword")).thenReturn(true);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(Authentication.class));

        when(JwtUtil.generateToken(user)).thenReturn("jwt-token");
        when(JwtUtil.generateRefreshToken(user)).thenReturn("refresh-token");

        when(userMapper.toLoginResponseDto(user, "jwt-token", "refresh-token"))
                .thenReturn(new LoginResponseDto(id, "User", "user@mail.com", Set.of(Role.USER), "jwt-token",
                        "refresh-token"));

        doNothing().when(refreshTokenService).saveOrUpdateRefreshToken(user, "refresh-token");
        doNothing().when(cookieUtil).setInCookie("refresh-token");

        LoginResponseDto response = userServiceImpl.login(loginRequestDto);

        assertEquals("jwt-token", response.access_token());
        assertEquals("refresh-token", response.refresh_token());
        assertEquals(id, response.id());
    }

    @Test
    void shouldFailIfEmailOrPasswordIsMissing() {
        LoginRequestDto dto = new LoginRequestDto("", "");
        when(userQueryService.getUserByEmail("")).thenThrow(new UserNotFoundException("user with email not found"));
        assertThrows(UserNotFoundException.class, () -> userServiceImpl.login(dto));
    }

    @Test
    void shouldFailLoginWithInvalidCredentials() {
        LoginRequestDto dto = new LoginRequestDto("user@mail.com", "wrongPassword");
        User user = new User(id, "User", "user@mail.com", "correctPassword", Set.of(Role.USER), Set.of(),
                LocalDateTime.now());

        when(userQueryService.getUserByEmail("user@mail.com")).thenReturn(user);
        when(encryptionService.comparePassword("wrongPassword", "correctPassword")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> userServiceImpl.login(dto));
    }
}
