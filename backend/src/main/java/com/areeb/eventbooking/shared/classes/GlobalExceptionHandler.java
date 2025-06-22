package com.areeb.eventbooking.shared.classes;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.areeb.eventbooking.shared.classes.ErrorResponseDto;

import com.areeb.eventbooking.event.exception.EventAlreadyBookedException;
import com.areeb.eventbooking.event.exception.EventNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.areeb.eventbooking.user.exception.EmailNotValidException;
import com.areeb.eventbooking.user.exception.InvalidCredentialsException;
import com.areeb.eventbooking.user.exception.UserNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleUserNotFound(UserNotFoundException ex) {
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponseDto> handleInvalidCredentials(InvalidCredentialsException ex) {
        return buildErrorResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleEmailNotValid(EmailNotValidException ex) {
        return buildErrorResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EventAlreadyBookedException.class)
    public ResponseEntity<ErrorResponseDto> handleEventAlreadyBooked(EventAlreadyBookedException ex) {
        return buildErrorResponse(ex, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleEventNotFound(EventNotFoundException ex) {
        return buildErrorResponse(ex, HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ErrorResponseDto> buildErrorResponse(Exception ex, HttpStatus status) {
        ErrorResponseDto error = new ErrorResponseDto(
                status.value(),
                ex.getMessage(),
                LocalDateTime.now());
        return new ResponseEntity<>(error, status);
    }

}
