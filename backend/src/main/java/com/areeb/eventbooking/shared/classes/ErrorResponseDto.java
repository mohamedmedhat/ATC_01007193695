package com.areeb.eventbooking.shared.classes;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class ErrorResponseDto {
    private int status;
    private String message;
    private LocalDateTime timestamp;

    public ErrorResponseDto(int status, String message, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }
}
