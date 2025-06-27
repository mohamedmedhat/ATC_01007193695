package com.areeb.eventbooking.event.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

public record EventRequestDto(
                String name,
                String description,
                String category,
                String venue,
                LocalDate date,
                BigDecimal price,
                Set<MultipartFile> images) {

}
