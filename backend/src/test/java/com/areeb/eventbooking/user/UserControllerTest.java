package com.areeb.eventbooking.user;

import com.areeb.eventbooking.shared.enums.Role;
import com.areeb.eventbooking.user.dto.request.LoginRequestDto;
import com.areeb.eventbooking.user.dto.request.RegisterRequestDto;
import com.areeb.eventbooking.user.dto.response.LoginResponseDto;
import com.areeb.eventbooking.user.dto.response.RegisterResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;
import java.util.UUID;

import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    private UUID id;
    private LoginRequestDto request;
    private RegisterRequestDto registerRequest;
    private LoginResponseDto loginResponse;
    private RegisterResponseDto registerResponse;

    @BeforeEach
    void setUp() {
        id = UUID.randomUUID();
        request = new LoginRequestDto("moa@gmail.com", "jdgk@#23ds");
        registerRequest = new RegisterRequestDto("Areeb", "moa@gmail.com", "jdgk@#23ds", Set.of(Role.USER));
        loginResponse = new LoginResponseDto(id, "kwk", "wefhj");
        registerResponse = new RegisterResponseDto(id, "Areeb", "moa@gmail.com", Set.of(Role.USER));
    }

    @Test
    void login_ShouldReturn200AndLoginResponseDto() throws Exception {
        Mockito.when(userService.login(request)).thenReturn(loginResponse);

        mockMvc.perform(post("/api/v1/users/auth/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.token").value("kwk"))
                .andExpect(jsonPath("$.refreshToken").value("wefhj"));

        verify(userService).login(request);
    }

    @Test
    void register_ShouldReturn201AndRegisterResponseDto() throws Exception {
        Mockito.when(userService.register(registerRequest)).thenReturn(registerResponse);

        mockMvc.perform(post("/api/v1/users/auth/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.name").value("Areeb"))
                .andExpect(jsonPath("$.email").value("moa@gmail.com"))
                .andExpect(jsonPath("$.roles[0]").value("USER"));

        verify(userService).register(registerRequest);
    }
}