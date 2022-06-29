package com.example.security.repository;

import com.example.security.entity.PatientDao;
import com.example.security.entity.TestsDao;
import com.example.security.entity.TransactionsDao;
import models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionsRepository extends JpaRepository<TransactionsDao, Integer> {

    @Query(value = "SELECT * FROM transactions t WHERE t.id = ?1",nativeQuery = true)
    public TransactionsDao findByTransactionId(Integer id);

    @Query(value = "SELECT * FROM transactions t WHERE t.patient_id = ?1",nativeQuery = true)
    public List<TransactionsDao> findByPatientId(Integer id);




}
