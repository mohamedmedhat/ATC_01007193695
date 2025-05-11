package com.areeb.eventbooking.event.dto.request;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Set;

public record EventRequestDto(
        String name,
        String description,
        String category,
        Date date,
        String venue,
        BigDecimal price,
        Set<String> images) {

}
