package com.areeb.eventbooking.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userServiceImpl;


    @Test
    void shouldHashPasswordBeforeSaving() {
        //Arrange
        //Act
        //Assert
    }

    @Test
    void shouldRegisterSuccessfullyWithValidData() {

    }

    @Test
    void shouldFailIfEmailIsMissingOrNotValid() {

    }

    @Test
    void shouldFailIfPasswordIsShortOrMissing() {

    }

    @Test
    void shouldFailIfUserIsAlreadyExist() {

    }

    @Test
    void shouldLoginSuccessfullyWithCorrectCredential() {

    }

    @Test
    void shouldFailIfEmailOrPasswordIsMissing() {

    }

    @Test
    void shouldFailLoginWithInvalidCredentials() {
        // e.g. wrong email or password
    }

    @Test
    void shouldReturnUserSuccessfully() {

    }

    @Test
    void shouldThrowUserNotFoundExceptionWhenFailFindUser() {

    }
}
