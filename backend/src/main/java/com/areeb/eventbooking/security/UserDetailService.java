package com.areeb.eventbooking.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.user.UserRepository;
import com.areeb.eventbooking.user.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User Not Found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRoles().stream()
                        .map(role -> "ROLE_" + role)
                        .map(SimpleGrantedAuthority::new)
                        .toList())
                .build();
    }

}
