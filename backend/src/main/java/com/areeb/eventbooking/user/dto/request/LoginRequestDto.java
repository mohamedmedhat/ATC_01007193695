package com.areeb.eventbooking.user.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

public record LoginRequestDto(
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Size(min = 8, max = 15)
        String password
) {
    public static LoginRequestDto sanitize(LoginRequestDto dto) {
        return new LoginRequestDto(
                Jsoup.clean(dto.email, Safelist.none()),
                Jsoup.clean(dto.password, Safelist.none())
        );
    }
}
