package com.areeb.eventbooking.event.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import com.areeb.eventbooking.common.images.dto.response.ImageResponseDto;

public record EventResponseDto(
                Long id,
                String name,
                String description,
                String category,
                String venue,
                LocalDate date,
                BigDecimal price,
                Set<ImageResponseDto> images) {

}
