package com.example.demo.bean;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class OTP {
    
    public enum OtpType { PHONE, EMAIL } // Used to distinguish the type of verification

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stores the recipient (either phone number or email address)
    @Column(nullable = false)
    private String identifier; 
    
    @Column(nullable = false)
    private String code;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OtpType type; 
    
    @Column(nullable = false)
    private LocalDateTime expiryTime;
    
    private boolean isUsed = false;

    public OTP() {}

    // Getters and Setters (Manual)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getIdentifier() { return identifier; }
    public void setIdentifier(String identifier) { this.identifier = identifier; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public OtpType getType() { return type; }
    public void setType(OtpType type) { this.type = type; }
    public LocalDateTime getExpiryTime() { return expiryTime; }
    public void setExpiryTime(LocalDateTime expiryTime) { this.expiryTime = expiryTime; }
    public boolean getIsUsed() { return isUsed; }
    public void setIsUsed(boolean isUsed) { this.isUsed = isUsed; }
}