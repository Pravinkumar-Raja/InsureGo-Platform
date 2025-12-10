package com.example.demo.payload.request;

public class OtpVerificationRequest {
    private String phoneNumber;
    private String email;      // <--- ADDED FIELD
    private String otpCode;

    // Constructors (omitted for brevity)

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    // <--- NEW GETTER/SETTER: Resolves the error in /register/verify-email-otp --->
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    // <--- END NEW GETTER/SETTER --->

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }
}