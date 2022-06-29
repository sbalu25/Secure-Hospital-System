package com.example.security.repository;

import com.example.security.entity.DiagnosisDao;
import com.example.security.entity.DrugsDao;
import com.example.security.entity.PrescriptionsDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiagnosisRepository extends JpaRepository<DiagnosisDao, Integer> {

    @Modifying
    @Query(value = "DELETE FROM diagnosis WHERE diagnosis_id = ?1",nativeQuery = true)
    public void deleteById(@Param("diagnosis_id")  Integer id);

    @Query(value = "SELECT * FROM diagnosis d WHERE d.patient_id = ?1",nativeQuery = true)
    public List<DiagnosisDao> findByPatientId(Integer id);

    @Query(value = "SELECT * FROM diagnosis d WHERE d.doctor_id = ?1",nativeQuery = true)
    public List<DiagnosisDao> findByDoctorId(Integer id);
}
