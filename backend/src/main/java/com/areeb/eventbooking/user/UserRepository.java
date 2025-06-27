package com.areeb.eventbooking.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.event WHERE u.email = :email")
    Optional<User> findByEmailWithEvents(@Param("email") String email);

    @Query("SELECT COUNT(u) FROM User u WHERE u.email = :email")
    long countByEmail(@Param("email") String email);
}
