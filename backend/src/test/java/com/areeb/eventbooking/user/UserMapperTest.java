package com.areeb.eventbooking.user;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Set;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.areeb.eventbooking.shared.enums.Role;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

@ExtendWith(SpringExtension.class)
public class UserMapperTest {
    private final UserMapper userMapper = new UserMapper();

    @Test
    void shouldMapUserToRegisterResponseDtoCorrectly() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setName("test");
        user.setEmail("test@example.com");
        user.setRoles(Set.of(Role.USER));

        // Act
        RegisterResponseDto dto = userMapper.toRegisterResponseDto(user);

        // Assert
        assertEquals(userId, dto.id());
        assertEquals("test", dto.name());
        assertEquals("test@example.com", dto.email());
        assertEquals(Set.of(Role.USER), dto.roles());
    }

    @Test
    void shouldMapUserToLoginResponseDtoCorrectly() {
        // Arrange
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);

        // Act
        LoginResponseDto dto = userMapper.toLoginResponseDto(user, "access123", "refresh456");

        // Assert
        assertEquals(userId, dto.id());
        assertEquals("access123", dto.access_token());
        assertEquals("refresh456", dto.refresh_token());
    }

    @Test
    void shouldSanitizeAndMapRegisterRequestDtoToUserCorrectly() {
        // Arrange
        RegisterRequestDto request = new RegisterRequestDto(
                "<b>MaliciousName</b>",
                "<script>bad</script>@mail.com",
                "<i>12345678</i>",
                Set.of(Role.ADMIN));

        // Act
        User user = userMapper.toUser(request);

        // Assert: Jsoup should remove the tags
        assertEquals("MaliciousName", user.getName());
        assertEquals("bad@mail.com", user.getEmail());
        assertEquals("12345678", user.getPassword());
        assertEquals(Set.of(Role.ADMIN), user.getRoles());
    }

    @Test
    void shouldPreserveValidInputsAfterSanitization() {
        // Arrange
        RegisterRequestDto request = new RegisterRequestDto(
                "Jane Doe",
                "jane@example.com",
                "securePass123",
                Set.of(Role.USER));

        // Act
        User user = userMapper.toUser(request);

        // Assert
        assertEquals("Jane Doe", user.getName());
        assertEquals("jane@example.com", user.getEmail());
        assertEquals("securePass123", user.getPassword());
        assertEquals(Set.of(Role.USER), user.getRoles());
    }

    @Test
    void shouldReturnUSERRoleAsDefaultWhenRoleNotProvided() {
        // Arrange
        RegisterRequestDto request = new RegisterRequestDto(
                "Jane Doe",
                "jane@example.com",
                "securePass123",
                Set.of());

        // Act
        User user = userMapper.toUser(request);

        // Assert
        assertEquals("Jane Doe", user.getName());
        assertEquals("jane@example.com", user.getEmail());
        assertEquals("securePass123", user.getPassword());
        assertEquals(Set.of(Role.USER), user.getRoles());

    }

}
