package com.areeb.eventbooking.event;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public ResponseEntity<EventResponseDto> createEvent(@RequestBody EventRequestDto request) {
        EventResponseDto response = eventService.createEvent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> getEvent(@PathVariable Long id) {
        EventResponseDto response = eventService.getEvent(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EventResponseDto>> getEvents(@RequestParam String category, @RequestParam int page,
            @RequestParam int size) {
        List<EventResponseDto> response = eventService.getEvents(category, page, size);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventResponseDto> updateEvent(@PathVariable Long id, @RequestBody EventRequestDto request) {
        EventResponseDto response = eventService.updateEvent(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<BookEventResponseDto> bookEvent(@PathVariable Long id, @RequestParam String userId) {
        BookEventResponseDto response = eventService.bookEvent(id, userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<BookEventResponseDto> cancelBooking(@PathVariable Long id, @RequestParam String userId) {
        BookEventResponseDto response = eventService.cancelBooking(id, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventResponseDto>> getUserBookedEvents(@PathVariable String userId,
            @RequestParam int page, @RequestParam int size) {
        List<EventResponseDto> response = eventService.getUserBookedEvents(userId, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{eventId}/isBooked")
    public ResponseEntity<Boolean> isEventBooked(@PathVariable Long eventId, @RequestParam String userId) {
        boolean isBooked = eventService.isEventBooked(eventId, userId);
        return ResponseEntity.ok(isBooked);
    }

}
