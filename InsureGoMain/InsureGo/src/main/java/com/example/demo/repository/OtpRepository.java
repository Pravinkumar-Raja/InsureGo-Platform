package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.bean.OTP;
import com.example.demo.bean.OTP.OtpType;

public interface OtpRepository extends JpaRepository<OTP, Long>{
	
    /**
     * Uses the findTopBy... convention to guarantee only one result is returned.
     * Orders by ExpiryTime DESC to get the newest (latest) unused OTP.
     */
    Optional<OTP> findTopByIdentifierAndTypeAndIsUsedOrderByExpiryTimeDesc(
        String identifier, 
        OtpType type,
        boolean isUsed
    );
}