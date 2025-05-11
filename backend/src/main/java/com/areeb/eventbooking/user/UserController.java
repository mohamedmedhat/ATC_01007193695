package com.areeb.eventbooking.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/users/")
public class UserController {
    private final UserService userService;

    @PostMapping("auth/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("auth/register")
    public ResponseEntity<RegisterResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
    }

}
