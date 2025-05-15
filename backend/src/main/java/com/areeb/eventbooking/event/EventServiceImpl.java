package com.areeb.eventbooking.event;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.areeb.eventbooking.common.images.Image;
import com.areeb.eventbooking.common.images.ImageService;
import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;
import com.areeb.eventbooking.event.exception.EventAlreadyBookedException;
import com.areeb.eventbooking.event.exception.EventNotFoundException;
import com.areeb.eventbooking.user.User;
import com.areeb.eventbooking.user.UserService;

import io.imagekit.sdk.exceptions.BadRequestException;
import io.imagekit.sdk.exceptions.ForbiddenException;
import io.imagekit.sdk.exceptions.InternalServerException;
import io.imagekit.sdk.exceptions.TooManyRequestsException;
import io.imagekit.sdk.exceptions.UnauthorizedException;
import io.imagekit.sdk.exceptions.UnknownException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final ImageService imageService;
    private final UserService userService;

    public Event getEventById(Long id) {
        return this.eventRepository.findById(id)
                .orElseThrow(() -> new EventNotFoundException("event with id: " + id + " not found"));
    }

    public Set<Image> toImageEntity(Set<MultipartFile> files, Event event)
            throws IOException, InternalServerException, BadRequestException,
            UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        Set<Image> images = new HashSet<>();
        for (MultipartFile file : files) {
            this.imageService.validateImage(file);
            String url = imageService.uploadImage(file);
            Image img = new Image();
            img.setUrl(url);
            img.setEvent(event);
            images.add(img);
        }
        return images;
    }

    @Override
    public EventResponseDto createEvent(EventRequestDto request) throws IOException, InternalServerException,
            BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        Event event = this.eventMapper.toEvent(request, new HashSet<>());
        Set<Image> images = toImageEntity(request.images(), event);
        event.setImages(images);
        Event savedEvent = this.eventRepository.save(event);
        return this.eventMapper.toEventResponseDto(savedEvent);
    }

    @Override
    public EventResponseDto updateEvent(Long id, EventRequestDto request) throws IOException, InternalServerException,
            BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        Event event = getEventById(id);
        event.getImages().clear();
        Set<Image> images = toImageEntity(request.images(), event);
        Event updatedEvent = this.eventMapper.toUpdatedEvent(event, request, images);
        Event savedEvent = this.eventRepository.save(updatedEvent);
        return this.eventMapper.toEventResponseDto(savedEvent);
    }

    @Override
    public EventResponseDto getEvent(Long id) {
        Event event = getEventById(id);
        return this.eventMapper.toEventResponseDto(event);
    }

    @Override
    public List<EventResponseDto> getEvents(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Event> events = this.eventRepository.findEventsByOptionalCategory(category, pageable);
        return this.eventMapper.toListEventResponseDto(events);
    }

    @Override
    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        this.eventRepository.delete(event);
    }

    @Override
    public BookEventResponseDto bookEvent(Long id, UUID userId) {
        if (this.eventRepository.findByIdAndUserId(id, userId) != null) {
            throw new EventAlreadyBookedException("you booked this event already");
        }
        Event event = getEventById(id);
        User user = this.userService.getUser(userId);
        user.getEvent().add(event);
        event.setUser(user);
        this.eventRepository.save(event);
        return this.eventMapper.toBookEventResponseDto(null); // ! Defaults to "Congratulation"
    }

    @Override
    public BookEventResponseDto cancelBooking(Long id, UUID userId) {
        Event event = this.eventRepository.findByIdAndUserId(id, userId);
        this.eventRepository.delete(event);
        return this.eventMapper.toBookEventResponseDto("event is canceled");
    }

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
