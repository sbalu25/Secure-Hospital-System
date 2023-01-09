package com.example.security.repository;

import com.example.security.entity.BillDao;
import com.example.security.entity.BlockChainDao;
import com.example.security.entity.LabtestsDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<BillDao, Integer> {

    @Query(value = "SELECT * FROM bill b WHERE b.patient_id = ?1",nativeQuery = true)
    public List<BillDao> findByPatientId(Integer id);
}
