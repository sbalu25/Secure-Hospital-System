package com.example.security.repository;

import com.example.security.entity.HelpTableDao;
import com.example.security.entity.InsurancePolicyDao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsurancePolicyRepository extends JpaRepository<InsurancePolicyDao, Integer> {


}
