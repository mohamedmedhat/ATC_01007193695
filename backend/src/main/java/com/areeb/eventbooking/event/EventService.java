package com.areeb.eventbooking.event;

import java.util.List;

import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;

public interface EventService {
    EventResponseDto createEvent(EventRequestDto request);

    EventResponseDto updateEvent(Long id, EventRequestDto request);

    EventResponseDto getEvent(Long id);

    List<EventResponseDto> getEvents(String category, int page, int size);

    void deleteEvent(Long id);

    BookEventResponseDto bookEvent(Long id, String userId);

    BookEventResponseDto cancelBooking(Long id, String userId);

    List<EventResponseDto> getUserBookedEvents(String userId, int page, int size);

    boolean isEventBooked(Long eventId, String userId);
}
