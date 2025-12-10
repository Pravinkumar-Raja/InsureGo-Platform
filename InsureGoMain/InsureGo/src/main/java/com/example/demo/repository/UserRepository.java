package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.bean.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber); 
    
    Optional<User> findByPhoneNumber(String phoneNumber); 
}