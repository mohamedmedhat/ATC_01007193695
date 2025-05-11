package com.areeb.eventbooking.common.images;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.areeb.eventbooking.event.Event;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @ManyToOne
    @Column(name = "event_id", nullable = false)
    private Event event;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
