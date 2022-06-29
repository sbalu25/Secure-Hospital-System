package com.example.security.repository;

import com.example.security.entity.InsuranceClaimDao;
import com.example.security.entity.InsuranceDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InsuranceRepository extends JpaRepository<InsuranceDao, Integer> {


    @Query(value = "SELECT * FROM insurance i WHERE i.patient_id = ?1",nativeQuery = true)
    public List<InsuranceDao> findByPatientId(Integer id);

}
