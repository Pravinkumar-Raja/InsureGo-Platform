package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.MailException;

@Service
public class EmailService {
    
    @Autowired 
    private JavaMailSender mailSender; 
    
    public void sendOtp(String toEmail, String otpCode) {
        
        if (toEmail == null || !toEmail.contains("@")) {
             throw new RuntimeException("Email service failed: Invalid email address format.");
        }
        
        SimpleMailMessage message = new SimpleMailMessage();
        
        message.setTo(toEmail);
        message.setSubject("InsureGo Verification Code");
        message.setText("Your verification code is: " + otpCode + 
                        "\n\nThis code expires in 5 minutes. Do not share this code.");

        try {
            mailSender.send(message); 
            System.out.println("--- EMAIL SENT SUCCESSFULLY to: " + toEmail + " ---");
            
        } catch (MailException e) {
            System.err.println("Mail sending FAILED for " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Failed to send email verification code. Please check SMTP configuration or try again.");
        }
    }
}