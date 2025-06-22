package com.areeb.eventbooking.common.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.imagekit.sdk.ImageKit;

@Configuration
public class ImageKitConfig {
    @Value("${imagekit.public.api-key}")
    private String publicApiKey;
    @Value("${imagekit.private.api-key}")
    private String privateApiKey;
    @Value("${imagekit.imagekit.id}")
    private String imagekitId;

    @Bean
    public ImageKit imageKit() {
        io.imagekit.sdk.config.Configuration config = new io.imagekit.sdk.config.Configuration(
                publicApiKey,
                privateApiKey,
                imagekitId);
        ImageKit imageKit = ImageKit.getInstance();
        imageKit.setConfig(config);
        return imageKit;
    }

}
