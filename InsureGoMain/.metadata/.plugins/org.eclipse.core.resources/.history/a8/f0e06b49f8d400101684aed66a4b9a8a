package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.bean.RegisterBean;

@Repository
public interface RegisterRepository extends JpaRepository<RegisterBean, Long>{
	 Optional<RegisterBean> findByUserid(String userid);
	//RegisterBean findbyUserId(String id);
}
