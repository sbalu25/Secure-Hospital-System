package com.example.security.service;


import com.example.security.entity.BlockChainDao;
import com.example.security.entity.DiagnosisDao;
import com.example.security.repository.BlockChainRepository;
import com.example.security.repository.DiagnosisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class BlockChainService {

    @Autowired
    private BlockChainRepository blockRepo;


    public List<BlockChainDao> getBlocks(){
        System.out.print(blockRepo.findAll().size());
        return blockRepo.findAll();
    }

    public List<BlockChainDao> getTransactionsBlocks(){
        List<BlockChainDao> transBlocks=blockRepo.findByTransactions();
        return transBlocks;
    }


    public List<BlockChainDao> getInsuranceClaimsBlocks(){
        List<BlockChainDao> claimBlocks=blockRepo.findByClaims();
        return claimBlocks;
    }
}
