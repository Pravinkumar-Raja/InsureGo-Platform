package com.example.demo.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; 

import com.example.demo.bean.User;
import com.example.demo.repository.UserRepository;

@Service
@Transactional 
public class AuthService {
	
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // --- Core Registration ---
    @Transactional 
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
             throw new RuntimeException("Email is already in use!");
        }
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
             throw new RuntimeException("Phone number is already registered!");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
		return userRepository.save(user); 
    }

    // --- Helper Methods ---
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public Boolean existsByPhoneNumber(String phoneNumber) { 
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    // --- Standard Login Logic ---
    public Optional<User> validateUser(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // 1. Password Verification
            if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.empty(); // Password mismatch
            }

            // 2. Dual Verification Check
            if (!user.getIsEmailVerified() || !user.getIsPhoneVerified()) {
                throw new RuntimeException("Account is incomplete. Please verify both email and phone number to log in.");
            }
            
            return userOptional; // Authentication successful
        }
        
        return Optional.empty(); // User not found
    }
}