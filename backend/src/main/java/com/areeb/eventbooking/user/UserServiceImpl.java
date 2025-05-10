package com.areeb.eventbooking.user;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;
import com.areeb.eventbooking.user.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public LoginResponseDto login(LoginRequestDto request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @Override
    public RegisterResponseDto register(RegisterRequestDto request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'register'");
    }

    @Override
    public User getUser(UUID id) {
        return this.userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("user with id: "+ id +"not found"));
    }

}
