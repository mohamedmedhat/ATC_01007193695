package com.areeb.eventbooking.event.service.booking;

import java.util.UUID;

import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;

public interface EventBookingService {
    BookEventResponseDto bookEvent(Long id, UUID userId);

    BookEventResponseDto cancelBooking(Long id, UUID userId);
}
