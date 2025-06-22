package com.areeb.eventbooking.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.areeb.eventbooking.shared.enums.Role;
import com.areeb.eventbooking.user.exception.UserNotFoundException;
import com.areeb.eventbooking.user.service.query.UserQueryServiceImpl;

@ExtendWith(MockitoExtension.class)
public class UserQueryServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserQueryServiceImpl userServiceImpl;

    private UUID id;

    @BeforeEach
    void setUp() {
        id = UUID.randomUUID();
    }

    @Test
    void shouldReturnUserSuccessfully() {
        User user = new User(id, "User", "user@mail.com", "encodedPass", Set.of(Role.USER), Set.of(),
                LocalDateTime.now());
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
