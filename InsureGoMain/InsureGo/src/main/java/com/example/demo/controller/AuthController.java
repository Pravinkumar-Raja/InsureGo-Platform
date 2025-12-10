package com.example.demo.controller;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.bean.User;
import com.example.demo.bean.OTP.OtpType;
import com.example.demo.payload.request.EmailRequest;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.PhoneRequest;
import com.example.demo.payload.request.OtpVerificationRequest;
import com.example.demo.payload.request.RegisterRequest;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.service.AuthService;
import com.example.demo.service.OtpService;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600) 
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired private AuthService authService;
	@Autowired private OtpService otpService;
    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserRepository userRepository;
    
    private final ConcurrentMap<String, Boolean> verifiedEmailCache = new ConcurrentHashMap<>();
    private final ConcurrentMap<String, Boolean> verifiedPhoneCache = new ConcurrentHashMap<>();


    // =========================================================
    // 1. DUAL-VERIFICATION REGISTRATION FLOW
    // =========================================================

    @PostMapping("/register/request-phone-otp")
    public ResponseEntity<?> requestPhoneOtp(@RequestBody PhoneRequest request) {
        String identifier = request.getPhoneNumber();
        try {
            if (authService.existsByPhoneNumber(identifier)) { 
                return ResponseEntity.badRequest().body("Error: Phone number already registered.");
            }
            otpService.requestOtp(identifier, OtpType.PHONE);
            return ResponseEntity.ok("Phone verification code sent.");
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(e.getMessage()); }
    }

    @PostMapping("/register/request-email-otp")
    public ResponseEntity<?> requestEmailOtp(@RequestBody EmailRequest request) { 
        String identifier = request.getEmail();
        try {
            if (authService.existsByEmail(identifier)) { 
                return ResponseEntity.badRequest().body("Error: Email already registered.");
            }
            otpService.requestOtp(identifier, OtpType.EMAIL);
            return ResponseEntity.ok("Email verification code sent.");
        } catch (RuntimeException e) { return ResponseEntity.badRequest().body(e.getMessage()); }
    }

    @PostMapping("/register/verify-phone-otp")
    public ResponseEntity<?> verifyPhoneOtp(@RequestBody OtpVerificationRequest request) {
        String identifier = request.getPhoneNumber(); 
        try {
            if (otpService.verifyOtp(identifier, request.getOtpCode(), OtpType.PHONE)) {
                verifiedPhoneCache.put(identifier, true);
                return ResponseEntity.ok("Phone verified. Proceed to email verification.");
            }
        } catch (IllegalArgumentException e) { return ResponseEntity.status(401).body(e.getMessage()); }
        return ResponseEntity.internalServerError().body("Verification failed.");
    }

    @PostMapping("/register/verify-email-otp")
    public ResponseEntity<?> verifyEmailOtp(@RequestBody OtpVerificationRequest request) { 
        String identifier = request.getEmail();
        try {
            if (otpService.verifyOtp(identifier, request.getOtpCode(), OtpType.EMAIL)) {
                verifiedEmailCache.put(identifier, true);
                return ResponseEntity.ok("Email verified. Click Register to finalize.");
            }
        } catch (IllegalArgumentException e) { return ResponseEntity.status(401).body(e.getMessage()); }
        return ResponseEntity.internalServerError().body("Verification failed.");
    }

    @PostMapping("/register")
    public ResponseEntity<?> finalizeRegistration(@RequestBody RegisterRequest signUpRequest) {
        String phoneId = signUpRequest.getPhoneNumber();
        String emailId = signUpRequest.getEmail();

        if (verifiedPhoneCache.remove(phoneId) == null || verifiedEmailCache.remove(emailId) == null) {
            return ResponseEntity.status(403).body("Verification required. Please verify both phone and email.");
        }
        
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(emailId);
        user.setPhoneNumber(phoneId);
        user.setPassword(signUpRequest.getPassword()); 
        user.setRole(User.Role.valueOf(signUpRequest.getRole())); 
        user.setIsEmailVerified(true);
        user.setIsPhoneVerified(true);

        try {
            authService.registerUser(user);
            return ResponseEntity.ok("Account created successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    // =========================================================
    // 2. STANDARD LOGIN FLOW (THE MISSING PIECE)
    // =========================================================
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        
        Optional<User> userOptional = authService.validateUser(
            loginRequest.getEmail(), 
            loginRequest.getPassword()
        );

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            String jwt = jwtUtils.generateJwtToken(user.getEmail(), user.getRole().name());

            return ResponseEntity.ok(new JwtResponse(
                jwt, 
                user.getEmail(), 
                user.getRole().name()
            ));
        }
        
        // This is returned if the user is not found OR if the passwordEncoder.matches fails.
        return ResponseEntity.status(401).body("Error: Invalid email or password.");
    }
}