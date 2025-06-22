package com.areeb.eventbooking.event.service.command;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import com.areeb.eventbooking.common.images.Image;
import com.areeb.eventbooking.common.images.ImageService;
import com.areeb.eventbooking.event.Event;
import com.areeb.eventbooking.event.EventMapper;
import com.areeb.eventbooking.event.EventRepository;
import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;
import com.areeb.eventbooking.event.service.query.EventQueryServiceImpl;

import io.imagekit.sdk.exceptions.BadRequestException;
import io.imagekit.sdk.exceptions.ForbiddenException;
import io.imagekit.sdk.exceptions.InternalServerException;
import io.imagekit.sdk.exceptions.TooManyRequestsException;
import io.imagekit.sdk.exceptions.UnauthorizedException;
import io.imagekit.sdk.exceptions.UnknownException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EventCommandServiceImpl implements EventCommandService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final ImageService imageService;
    private final EventQueryServiceImpl eventQueryService;

    @Caching(evict = {
            @CacheEvict(value = "events", allEntries = true),
            @CacheEvict(value = "userBookedEvents", allEntries = true)
    })
    @Override
    public EventResponseDto createEvent(EventRequestDto request) throws IOException, InternalServerException,
            BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        Event event = this.eventMapper.toEvent(request, new HashSet<>());
        Set<Image> images = this.imageService.toImageEntity(request.images(), event);
        event.setImages(images);
        Event savedEvent = this.eventRepository.save(event);
        return this.eventMapper.toEventResponseDto(savedEvent);
    }

    @Caching(put = {
            @CachePut(value = "event", key = "#result.id")
    }, evict = {
            @CacheEvict(value = "events", allEntries = true),
            @CacheEvict(value = "userBookedEvents", allEntries = true)
    })
    @Override
    public EventResponseDto updateEvent(Long id, EventRequestDto request) throws IOException, InternalServerException,
            BadRequestException, UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        Event event = this.eventQueryService.getEventById(id);
        event.getImages().clear();
        Set<Image> images = this.imageService.toImageEntity(request.images(), event);
        Event updatedEvent = this.eventMapper.toUpdatedEvent(event, request, images);
        Event savedEvent = this.eventRepository.save(updatedEvent);
        return this.eventMapper.toEventResponseDto(savedEvent);
    }

    @Caching(evict = {
            @CacheEvict(value = "event", key = "#id"),
            @CacheEvict(value = "events", allEntries = true),
            @CacheEvict(value = "userBookedEvents", allEntries = true)
    })
    @Override
    public void deleteEvent(Long id) {
        Event event = this.eventQueryService.getEventById(id);
        this.eventRepository.delete(event);
    }

}
