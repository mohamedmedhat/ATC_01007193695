package com.areeb.eventbooking.event.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EventAlreadyBookedException extends RuntimeException {
    public EventAlreadyBookedException(String msg){
        super(msg);
    }

}
