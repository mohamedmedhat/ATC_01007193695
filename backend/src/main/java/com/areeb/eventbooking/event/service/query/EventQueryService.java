package com.areeb.eventbooking.event.service.query;

import java.util.List;
import java.util.UUID;

import com.areeb.eventbooking.event.dto.response.EventResponseDto;

public interface EventQueryService {
    EventResponseDto getEvent(Long id);

    List<EventResponseDto> getEvents(String category, int page, int size);

    List<EventResponseDto> getUserBookedEvents(UUID userId, int page, int size);

    boolean isEventBooked(Long eventId, UUID userId);
}
