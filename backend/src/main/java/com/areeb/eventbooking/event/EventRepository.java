package com.areeb.eventbooking.event;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
        Event findByIdAndUserId(Long id, UUID user);

        Page<Event> findAllByUserId(UUID user, Pageable pageable);

        @Query("SELECT e FROM Event e WHERE " +
                        "(:category IS NULL OR :category = '' OR e.category = :category)")
        Page<Event> findEventsByOptionalCategory(
                        @Param("category") String category,
                        Pageable pageable);
}
