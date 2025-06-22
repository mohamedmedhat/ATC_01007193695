package com.areeb.eventbooking.event;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.areeb.eventbooking.common.images.Image;
import com.areeb.eventbooking.common.images.dto.response.ImageResponseDto;
import com.areeb.eventbooking.event.dto.request.EventRequestDto;
import com.areeb.eventbooking.event.dto.response.BookEventResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class EventMapper {

    public Event toEvent(EventRequestDto request, Set<Image> images) {
        Event event = new Event();
        event.setName(request.name());
        event.setDescription(request.description());
        event.setCategory(request.category());
        event.setDate(request.date());
        event.setVenue(request.venue());
        event.setPrice(request.price());
        event.setImages(images);
        return event;
    }

    public Event toUpdatedEvent(Event event, EventRequestDto request, Set<Image> images) {
        event.setName(request.name());
        event.setDescription(request.description());
        event.setCategory(request.category());
        event.setDate(request.date());
        event.setVenue(request.venue());
        event.setPrice(request.price());
        event.getImages().clear();
        event.getImages().addAll(images);
        return event;
    }

    public EventResponseDto toEventResponseDto(Event event) {
        return new EventResponseDto(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getCategory(),
                event.getDate(),
                event.getVenue(),
                event.getPrice(),
                event.getImages().stream()
                        .map(img -> new ImageResponseDto(img.getId(), img.getUrl()))
                        .collect(Collectors.toSet()));
    }

    public List<EventResponseDto> toListEventResponseDto(Page<Event> events) {
        return events.stream()
                .map(event -> new EventResponseDto(
                        event.getId(),
                        event.getName(),
                        event.getDescription(),
                        event.getCategory(),
                        event.getDate(),
                        event.getVenue(),
                        event.getPrice(),
                        event.getImages().stream()
                                .map(img -> new ImageResponseDto(img.getId(), img.getUrl()))
                                .collect(Collectors.toSet())))
                .toList();
    }

    public BookEventResponseDto toBookEventResponseDto(String msg) {
        return new BookEventResponseDto(msg != null ? msg : "Congratulation");
    }

}
