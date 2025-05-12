package com.areeb.eventbooking.event;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;

import io.imagekit.sdk.exceptions.BadRequestException;
import io.imagekit.sdk.exceptions.ForbiddenException;
import io.imagekit.sdk.exceptions.InternalServerException;
import io.imagekit.sdk.exceptions.TooManyRequestsException;
import io.imagekit.sdk.exceptions.UnauthorizedException;
import io.imagekit.sdk.exceptions.UnknownException;

public interface EventService {
    EventResponseDto createEvent(EventRequestDto request) throws IOException, InternalServerException, BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException ;

    EventResponseDto updateEvent(Long id, EventRequestDto request)  throws IOException, InternalServerException, BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException ;

    EventResponseDto getEvent(Long id);

    List<EventResponseDto> getEvents(String category, int page, int size);

    void deleteEvent(Long id);

    BookEventResponseDto bookEvent(Long id, UUID userId);

    BookEventResponseDto cancelBooking(Long id, UUID userId);

    List<EventResponseDto> getUserBookedEvents(UUID userId, int page, int size);

    boolean isEventBooked(Long eventId, UUID userId);
}
