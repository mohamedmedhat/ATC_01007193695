package com.areeb.eventbooking.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailNotValidException extends RuntimeException {
    public EmailNotValidException(String msg) {
        super(msg);
    }

}
