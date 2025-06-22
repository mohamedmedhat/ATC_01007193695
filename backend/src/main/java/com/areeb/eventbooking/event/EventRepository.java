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
        @Query("SELECT e FROM Event e WHERE e.id = :id AND e.user.id = :user")
        Event findByIdAndUserId(@Param("id") Long id, @Param("user") UUID user);

        @Query("SELECT e FROM Event e WHERE e.user.id = :user")
        Page<Event> findAllByUserId(@Param("user") UUID user, Pageable pageable);

        @Query("SELECT e FROM Event e WHERE " +
                        "(:category IS NULL OR :category = '' OR e.category = :category)")
        Page<Event> findEventsByOptionalCategory(
                        @Param("category") String category,
                        Pageable pageable);
}
