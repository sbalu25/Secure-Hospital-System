package com.example.security.repository;

import com.example.security.entity.PatientDao;
import com.example.security.entity.UserDao;
import models.Patient;
import models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PatientRepository extends JpaRepository<PatientDao, Integer> {

    @Query(value = "Select * from patient p where p.patient_id=?1",nativeQuery = true)
    public PatientDao getById(Integer id);





}
