package com.example.security.repository;


import com.example.security.entity.LabtestsDao;
import com.example.security.entity.PrescriptionsDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LabTestsRepository extends JpaRepository<LabtestsDao, Integer> {

    @Query(value = "SELECT * FROM labtests l WHERE l.patient_id = ?1",nativeQuery = true)
    public List<LabtestsDao> findByPatientId(Integer id);

    @Query(value = "SELECT * FROM labtests l WHERE l.doctor_id = ?1",nativeQuery = true)
    public List<LabtestsDao> findByDoctorId(Integer id);

    @Query(value = "SELECT * FROM labtests l WHERE l.lab_id = ?1",nativeQuery = true)
    public LabtestsDao findByLabId(Integer id);

}
