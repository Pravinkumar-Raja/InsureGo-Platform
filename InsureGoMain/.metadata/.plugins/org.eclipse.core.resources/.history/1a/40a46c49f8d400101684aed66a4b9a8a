package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.bean.RegisterBean;
import com.example.demo.repository.RegisterRepository;

@Service
public class RegisterService {
@Autowired
private RegisterRepository rerepo;
 
public String addRegister(RegisterBean rb) {
	if(rb!=null) {
		rerepo.save(rb);
		return "Registered Succesfully..";
	}else {
		return "Not Registered..";
	}
	
}

public int addCredential(String userid, String pass) {
	
	
	Optional<RegisterBean> rb=rerepo.findByUserid(userid);
	if (rb.isPresent()) {
	RegisterBean rrb=rb.get();
	if(rrb.getPassword().equals(pass))
	{
		return 1;
		
	}
	else
	{
		return 0;
	}
	}
	else
	{
		return 0;
	}
}
}
