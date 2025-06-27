package com.areeb.eventbooking.event;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.areeb.eventbooking.common.images.dto.response.ImageResponseDto;
import com.areeb.eventbooking.event.dto.response.EventResponseDto;
import com.areeb.eventbooking.event.exception.EventNotFoundException;
import com.areeb.eventbooking.event.service.query.EventQueryServiceImpl;

@ExtendWith(MockitoExtension.class)
public class EventQueryServiceTest {

    @Mock
    EventRepository eventRepository;

    @Mock
    EventMapper eventMapper;

    @InjectMocks
    EventQueryServiceImpl eventQueryService;

    private Long id;
    private Event event;
    private EventResponseDto eventResponseDto;

    @BeforeEach
    void setUp() {
        id = 1L;

        event = new Event(
                id,
                "Sample Event",
                "This is a sample event description.",
                "Music",
                "Sample Venue",
                LocalDate.of(2023, 10, 1),
                BigDecimal.valueOf(100.00),
                Set.of()
                , null, LocalDateTime.now(), LocalDateTime.now());

        eventResponseDto = new EventResponseDto(
                id,
                "Sample Event",
                "This is a sample event description.",
                "Music",
                "Sample Venue",
                LocalDate.of(2023, 10, 1),
                BigDecimal.valueOf(100.00),
                Set.of(new ImageResponseDto(1L, "Image 1")));
    }

    @Test
    void shouldReturnEventSuccessfully() {
        // Given
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        when(eventMapper.toEventResponseDto(event)).thenReturn(eventResponseDto);

        // When
        EventResponseDto response = eventQueryService.getEvent(id);

        // Then
        assertNotNull(response);
        assertEquals(id, response.id());
        assertEquals("Sample Event", response.name());
        assertEquals("This is a sample event description.", response.description());
        assertEquals("Music", response.category());
        assertEquals(LocalDate.of(2023, 10, 1), response.date());
        assertEquals("Sample Venue", response.venue());
        assertEquals(BigDecimal.valueOf(100.00), response.price());
        assertEquals(1, response.images().size());
        assertTrue(response.images().contains(new ImageResponseDto(1L, "Image 1")));

        verify(eventRepository).findById(id);
        verify(eventMapper).toEventResponseDto(event);
    }

    @Test
    void shouldThrowExceptionWhenEventNotFound() {
        when(eventRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(EventNotFoundException.class, () -> {
            eventQueryService.getEvent(id);
        });

        verify(eventRepository).findById(id);
        verify(eventMapper, never()).toEventResponseDto(any());
    }
}