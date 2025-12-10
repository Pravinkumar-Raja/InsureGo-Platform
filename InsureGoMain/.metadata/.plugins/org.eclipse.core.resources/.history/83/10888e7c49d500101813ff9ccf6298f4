package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.bean.Notification;

@Repository
public interface NotifiactionRepository extends JpaRepository<Notification,Long>{
List<Notification>findByUserIdOrderByCreatedAtDesc(Long userId);
List<Notification>findByReadFlagFalse();
}
