package com.example.security.repository;

import com.example.security.entity.DoctorDao;
import com.example.security.entity.PatientDao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<DoctorDao, Integer> {

}
