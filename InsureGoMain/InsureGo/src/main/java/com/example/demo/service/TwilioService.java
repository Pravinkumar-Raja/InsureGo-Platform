package com.example.demo.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Service
public class TwilioService {

    @Value("${twilio.account.sid}")
    private String ACCOUNT_SID;

    @Value("${twilio.auth.token}")
    private String AUTH_TOKEN;

    @Value("${twilio.phone.number}")
    private String TWILIO_PHONE_NUMBER;

    // Initialize Twilio credentials when the service is constructed
    @PostConstruct 
    public void init() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String toPhoneNumber, String messageBody) {
        try {
            Message.creator(
                new PhoneNumber(toPhoneNumber),  // To: User's number
                new PhoneNumber(TWILIO_PHONE_NUMBER), // From: Twilio number
                messageBody
            ).create();
            
        } catch (Exception e) {
            // Crucial: Log the Twilio error for debugging
            System.err.println("Twilio SMS failed for " + toPhoneNumber + ": " + e.getMessage());
            // Throw a user-friendly message
            throw new RuntimeException("Failed to send verification code. Please check your phone number format.");
        }
    }
}