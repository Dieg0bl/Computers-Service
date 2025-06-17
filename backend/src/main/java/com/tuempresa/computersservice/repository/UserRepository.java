package com.tuempresa.computersservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.computersservice.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
