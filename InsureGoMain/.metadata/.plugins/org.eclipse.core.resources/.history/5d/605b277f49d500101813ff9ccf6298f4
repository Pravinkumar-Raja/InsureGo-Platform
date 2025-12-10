package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.bean.Policy;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long>{
List<Policy>findByUserId(Long userId);
List<Policy>findByExpiryDateBetween(LocalDate from,LocalDate to);
}
