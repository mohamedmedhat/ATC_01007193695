package com.areeb.eventbooking.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import com.areeb.eventbooking.shared.enums.Role;

public record RegisterRequestDto(
        @NotBlank @Size(min = 2, max = 40) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 15) String password,
        Set<Role> roles) {
    public static RegisterRequestDto sanitize(RegisterRequestDto dto) {
        return new RegisterRequestDto(
                Jsoup.clean(dto.name, Safelist.none()),
                dto.email.replaceAll("<.*?>", ""),
                Jsoup.clean(dto.password, Safelist.none()),
                (dto.roles() == null || dto.roles().isEmpty()) ? Set.of(Role.USER) : dto.roles());
    }
}
