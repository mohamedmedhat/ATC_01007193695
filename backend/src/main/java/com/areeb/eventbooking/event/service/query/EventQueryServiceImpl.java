package com.areeb.eventbooking.event.service.query;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.event.Event;
import com.areeb.eventbooking.event.EventMapper;
import com.areeb.eventbooking.event.EventRepository;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;
import com.areeb.eventbooking.event.exception.EventNotFoundException;

import org.springframework.cache.annotation.Cacheable;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventQueryServiceImpl implements EventQueryService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    public Event getEventById(Long id) {
        return this.eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("event with id: " + id + " not found"));
    }

    @Cacheable(value="event", key="#id")
    @Override
    public EventResponseDto getEvent(Long id) {
        Event event = getEventById(id);
        return this.eventMapper.toEventResponseDto(event);
    }

    @Cacheable(value="events", key="#category + '-' + #page + '-' + #size")
    @Override
    public List<EventResponseDto> getEvents(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> events = this.eventRepository.findEventsByOptionalCategory(category, pageable);
        return this.eventMapper.toListEventResponseDto(events);
    }

    @Cacheable(value="userBookedEvents", key="#userId + '-' + #page + '-' + #size")
    @Override
    public List<EventResponseDto> getUserBookedEvents(UUID userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> events = this.eventRepository.findAllByUserId(userId, pageable);
        return this.eventMapper.toListEventResponseDto(events);
    }

    @Override
    public boolean isEventBooked(Long eventId, UUID userId) {
        return this.eventRepository.findByIdAndUserId(eventId, userId) != null;
    }

}
