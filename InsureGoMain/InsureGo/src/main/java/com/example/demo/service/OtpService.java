package com.example.demo.service;

import com.example.demo.bean.OTP;
import com.example.demo.bean.OTP.OtpType;
import com.example.demo.bean.User;
import com.example.demo.repository.OtpRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.security.SecureRandom;
import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final TwilioService twilioService;
    private final EmailService emailService;
    private final UserRepository userRepository; 
    private final JwtUtils jwtUtils;           

    private final Random random = new SecureRandom();
    
    @Value("${otp.expiry.minutes:5}") 
    private long otpExpiryMinutes; 

    public OtpService(
            OtpRepository otpRepository, 
            TwilioService twilioService, 
            EmailService emailService, 
            UserRepository userRepository,
            JwtUtils jwtUtils) {
        this.otpRepository = otpRepository;
        this.twilioService = twilioService;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    private String generateRandomCode() {
        return String.format("%06d", random.nextInt(1000000));
    }

    public void requestOtp(String identifier, OtpType type) {
        
        String code = generateRandomCode();
        OTP otp = new OTP();
        otp.setIdentifier(identifier);
        otp.setCode(code);
        otp.setType(type);
        otp.setExpiryTime(LocalDateTime.now().plusMinutes(otpExpiryMinutes)); 
        otpRepository.save(otp);

        String message = "Your verification code is " + code + ".";
        
        if (type == OtpType.PHONE) {
            twilioService.sendSms(identifier, message);
        } else if (type == OtpType.EMAIL) {
            emailService.sendOtp(identifier, code);
        }
    }

    public boolean verifyOtp(String identifier, String otpCode, OtpType type) {
        
        // Use the findTopBy... method to guarantee a single result
        OTP latestOtp = otpRepository.findTopByIdentifierAndTypeAndIsUsedOrderByExpiryTimeDesc(
            identifier, 
            type,
            false // Look for unused codes
        ) 
        .orElseThrow(() -> new IllegalArgumentException("Invalid, expired, or previously used code.")); 

        if (!latestOtp.getCode().equals(otpCode) || latestOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
             throw new IllegalArgumentException("Invalid or expired code.");
        }

        latestOtp.setIsUsed(true);
        otpRepository.save(latestOtp);
        
        return true;
    }

    // This method is available for a future passwordless login flow if you implement it.
    public String verifyLoginOtp(String phoneNumber, String otpCode) {
        if (verifyOtp(phoneNumber, otpCode, OtpType.PHONE)) {
            User user = userRepository.findByPhoneNumber(phoneNumber)
                            .orElseThrow(() -> new RuntimeException("User not found after verification."));
            
            if (!user.getIsPhoneVerified() || !user.getIsEmailVerified()) {
                 throw new RuntimeException("Account verification incomplete. Please complete registration.");
            }
            
            return jwtUtils.generateJwtToken(user.getEmail(), user.getRole().name()); 
        }
        return null;
    }
}