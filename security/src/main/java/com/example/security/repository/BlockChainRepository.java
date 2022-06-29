package com.example.security.repository;

import com.example.security.entity.BlockChainDao;
import com.example.security.entity.DiagnosisDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlockChainRepository extends JpaRepository<BlockChainDao, Integer> {

    @Query(value = "SELECT * FROM blockchain b WHERE b.entity = 'transaction'",nativeQuery = true)
    public List<BlockChainDao> findByTransactions();

    @Query(value = "SELECT * FROM blockchain b WHERE b.entity = 'insurance_claim'",nativeQuery = true)
    public List<BlockChainDao> findByClaims();
}
