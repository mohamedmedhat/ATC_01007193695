package com.areeb.eventbooking.event;

import java.util.List;

import org.springframework.stereotype.Service;

import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService{
    private final EventRepository eventRepository;
    
    @Override
    public EventResponseDto createEvent(EventRequestDto request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createEvent'");
    }

    @Override
    public EventResponseDto updateEvent(Long id, EventRequestDto request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEvent'");
    }

    @Override
    public EventResponseDto getEvent(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEvent'");
    }

    @Override
    public List<EventResponseDto> getEvents(String category, int page, int size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getEvents'");
    }

    @Override
    public void deleteEvent(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteEvent'");
    }

    @Override
    public BookEventResponseDto bookEvent(Long id, String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'bookEvent'");
    }

    @Override
    public BookEventResponseDto cancelBooking(Long id, String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'cancelBooking'");
    }

    @Override
    public List<EventResponseDto> getUserBookedEvents(String userId, int page, int size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserBookedEvents'");
    }

    @Override
    public boolean isEventBooked(Long eventId, String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isEventBooked'");
    }

}
