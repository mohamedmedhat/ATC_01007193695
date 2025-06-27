package com.areeb.eventbooking.event.service.booking;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.areeb.eventbooking.event.Event;
import com.areeb.eventbooking.event.EventMapper;
import com.areeb.eventbooking.event.EventRepository;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.exception.EventAlreadyBookedException;
import com.areeb.eventbooking.event.service.query.EventQueryServiceImpl;
import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.user.service.query.UserQueryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventBookingServiceImpl implements EventBookingService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final UserQueryService userService;
    private final EventQueryServiceImpl eventQueryService;

    @Override
    public BookEventResponseDto bookEvent(Long id, UUID userId) {
        if (this.eventRepository.findByIdAndUserId(id, userId) != null) {
            throw new EventAlreadyBookedException("you booked this event already");
        }
        Event event = this.eventQueryService.getEventById(id);
        User user = this.userService.getUser(userId);
        user.getEvent().add(event);
        event.setUser(user);
        this.eventRepository.save(event);
        return this.eventMapper.toBookEventResponseDto(null); // ! Defaults to "Congratulation"
    }

    @Override
    public BookEventResponseDto cancelBooking(Long id, UUID userId) {
        Event event = this.eventRepository.findByIdAndUserId(id, userId);

        event.setUser(null);

        eventRepository.save(event);

        return this.eventMapper.toBookEventResponseDto("event booking is canceled");
    }

}
