package com.example.security.repository;

import com.example.security.entity.HelpTableDao;
import com.example.security.entity.PatientDao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpTableRepository extends JpaRepository<HelpTableDao, Integer> {
}
