package com.areeb.eventbooking.common.images;

import org.springframework.stereotype.Component;

import com.areeb.eventbooking.common.images.dto.response.ImageResponseDto;

@Component
public class ImageMapper {

    ImageResponseDto toImageResponseDto(Image image) {
        return new ImageResponseDto(
                image.getId(),
                image.getUrl());
    }
}
