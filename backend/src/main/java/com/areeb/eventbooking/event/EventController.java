package com.areeb.eventbooking.event;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;
import com.areeb.eventbooking.event.service.booking.EventBookingService;
import com.areeb.eventbooking.event.service.command.EventCommandService;
import com.areeb.eventbooking.event.service.query.EventQueryService;

import io.imagekit.sdk.exceptions.BadRequestException;
import io.imagekit.sdk.exceptions.ForbiddenException;
import io.imagekit.sdk.exceptions.InternalServerException;
import io.imagekit.sdk.exceptions.TooManyRequestsException;
import io.imagekit.sdk.exceptions.UnauthorizedException;
import io.imagekit.sdk.exceptions.UnknownException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventCommandService eventCommandService;
    private final EventQueryService eventQueryService;
    private final EventBookingService eventBookingService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventResponseDto> createEvent(@ModelAttribute @Valid EventRequestDto request)
            throws IOException, InternalServerException, BadRequestException, UnknownException, ForbiddenException,
            TooManyRequestsException, UnauthorizedException {
        EventResponseDto response = eventCommandService.createEvent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEvent(@PathVariable Long id) {
        EventResponseDto response = eventQueryService.getEvent(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getEvents(@RequestParam(required = false) String category,
            @RequestParam int page,
            @RequestParam int size) {
        List<EventResponseDto> response = eventQueryService.getEvents(category, page, size);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventResponseDto> updateEvent(@PathVariable Long id,
            @ModelAttribute @Valid EventRequestDto request)
            throws IOException, InternalServerException, BadRequestException, UnknownException, ForbiddenException,
            TooManyRequestsException, UnauthorizedException {
        EventResponseDto response = eventCommandService.updateEvent(id, request);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventCommandService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<BookEventResponseDto> bookEvent(@PathVariable Long id, @RequestParam UUID userId) {
        BookEventResponseDto response = eventBookingService.bookEvent(id, userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<BookEventResponseDto> cancelBooking(@PathVariable Long id, @RequestParam UUID userId) {
        BookEventResponseDto response = eventBookingService.cancelBooking(id, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventResponseDto>> getUserBookedEvents(@PathVariable UUID userId,
            @RequestParam int page, @RequestParam int size) {
        List<EventResponseDto> response = eventQueryService.getUserBookedEvents(userId, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{eventId}/isBooked")
    public ResponseEntity<Boolean> isEventBooked(@PathVariable Long eventId, @RequestParam UUID userId) {
        boolean isBooked = eventQueryService.isEventBooked(eventId, userId);
        return ResponseEntity.ok(isBooked);
    }

}
