package com.example.security.repository;

import com.example.security.entity.DrugsDao;
import com.example.security.entity.HelpTableDao;
import com.example.security.entity.InsuranceClaimDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InsuranceClaimRepository extends JpaRepository<InsuranceClaimDao, Integer> {

    @Query(value = "SELECT * FROM insurance_claim i WHERE i.patient_id = ?1",nativeQuery = true)
    public List<InsuranceClaimDao> findByPatientId(Integer id);
}
