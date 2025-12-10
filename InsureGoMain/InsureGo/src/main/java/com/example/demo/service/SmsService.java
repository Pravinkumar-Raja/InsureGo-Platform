package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;

import com.twilio.Twilio;

public class SmsService {

	@Value("$(twilio.phone.numer)")
	private String twilioPhoneNumber;
	
	public void sendOtp(String phone, String otp) {
	Twilio.init(null);
		
	}

}
