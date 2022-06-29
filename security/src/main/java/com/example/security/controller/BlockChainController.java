package com.example.security.controller;

import com.example.security.entity.BlockChainDao;
import com.example.security.entity.DiagnosisDao;
import com.example.security.service.BlockChainService;
import com.example.security.service.HelpTableService;
import models.Diagnosis;
import models.Transactions;
import org.hyperledger.fabric.gateway.Contract;
import org.hyperledger.fabric.gateway.ContractException;
import org.hyperledger.fabric.gateway.Network;
import org.hyperledger.fabric.sdk.Peer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.util.EnumSet;
import java.util.List;
import java.util.concurrent.TimeoutException;


@RestController
@RequestMapping("blockchain")
public class BlockChainController {

    @Autowired
    private BlockChainService blockService;

    private Contract contract;


    private Network network;

    @GetMapping("/list")
    public List<BlockChainDao> getBlocks(){
        return blockService.getBlocks();
    }


    @GetMapping("/getUser")
    public String getUser(String userId) throws ContractException {
        byte[] queryAResultBefore = contract.evaluateTransaction("getUser",userId);
        return new String(queryAResultBefore, StandardCharsets.UTF_8);
    }

    @GetMapping("/addUser")
    public String addUser(String userId, String userName, String money) throws ContractException, InterruptedException, TimeoutException {
        byte[] invokeResult = contract.createTransaction("addUser")
                .setEndorsingPeers(network.getChannel().getPeers(EnumSet.of(Peer.PeerRole.ENDORSING_PEER)))
                .submit(userId, userName, money);
        String txId = new String(invokeResult, StandardCharsets.UTF_8);
        return txId;
    }

    @GetMapping("/listByTransactions")
    public List<BlockChainDao> getTransactionsBlocks(){
        return blockService.getTransactionsBlocks();
    }

    @GetMapping("/listByInsuranceClaims")
    public List<BlockChainDao> getInsuranceClaimsBlocks(){
        return blockService.getInsuranceClaimsBlocks();
    }

    @GetMapping("/queryAll")
    public String queryAll() throws ContractException {
        byte[] queryAResultBefore = contract.evaluateTransaction("queryAll");
        return new String(queryAResultBefore, StandardCharsets.UTF_8);
    }

    @GetMapping("/getHistory")
    public String getHistory(String userId) throws ContractException {
        byte[] queryAResultBefore = contract.evaluateTransaction("getHistory", userId);
        return new String(queryAResultBefore, StandardCharsets.UTF_8);
    }

}
