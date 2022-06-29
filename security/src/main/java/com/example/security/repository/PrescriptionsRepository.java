package com.example.security.repository;

import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.entity.UserDao;
import models.Prescriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PrescriptionsRepository  extends JpaRepository<PrescriptionsDao, Integer> {


    @Query(value = "SELECT * FROM prescriptions p WHERE p.patient_id = ?1",nativeQuery = true)
    public List<PrescriptionsDao> findByPatientId(Integer id);

    @Query(value = "SELECT * FROM prescriptions p WHERE p.doctor_id = ?1",nativeQuery = true)
    public List<PrescriptionsDao> findByDoctorId(Integer id);


}
