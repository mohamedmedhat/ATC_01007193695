package com.areeb.eventbooking.event;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EventRepository extends JpaRepository<Event, Long>{
    Optional<Event> findById(Long id);
    Event findByIdAndUserId(Long id, UUID user);
    Page<Event> findAllByUserId(UUID user, Pageable pageable);
}
