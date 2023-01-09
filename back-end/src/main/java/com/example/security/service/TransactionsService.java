package com.example.security.service;


import com.example.security.entity.*;
import com.example.security.repository.BlockChainRepository;
import com.example.security.repository.InsuranceClaimRepository;
import com.example.security.repository.PrescriptionsRepository;
import com.example.security.repository.TransactionsRepository;
import models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository transRepo;


    @Autowired
    private InsuranceClaimRepository insClaimRepo;


    @Autowired
    private BlockChainRepository blockRepo;


    public List<Transactions> getTransactions(){

        List<Transactions> finalResult=new ArrayList<Transactions>();
        List<TransactionsDao> listOfTrans=transRepo.findAll();

        Iterator<TransactionsDao> itr=listOfTrans.iterator();

        while(itr.hasNext()){
            TransactionsDao p=itr.next();

            Transactions result=new Transactions();
            result.setId(p.getId());
            result.setTransaction_id(p.getTransaction_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setTransaction_type(p.getTransaction_type());
            result.setAmount(p.getAmount());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setNotes(p.getNotes());
            result.setCreated_by(p.getCreated_by());
            result.setApproved_by(p.getApproved_by());
            result.setApproved_by_id(p.getApproved_by_id());
            List<InsuranceClaimDao> subResult=new ArrayList<InsuranceClaimDao>();
            subResult=insClaimRepo.findByPatientId(p.getPatient_id());
            System.out.println(subResult);
            result.setClaim(subResult);

            finalResult.add(result);

        }


        return finalResult;
    }

    public String createTransactions(Transactions trans){
        TransactionsDao result=new TransactionsDao();


        result.setTransaction_id(UUID.randomUUID().toString());
        result.setPatient_id(trans.getPatient_id());
        result.setPatient_name(trans.getPatient_name());
        result.setTransaction_type(trans.getTransaction_type());
        result.setAmount(trans.getAmount());
        result.setStatus(trans.getStatus());
        result.setTime(trans.getTime());
        result.setNotes(trans.getNotes());
        result.setCreated_by(trans.getCreated_by());
        System.out.println(result.toString());
        try {
            transRepo.save(result);
            return "success";

        }
        catch(Exception e){
            return e.toString();
        }




    }
    public String authorizeTransactions(Transactions trans){
        TransactionsDao transaction=transRepo.findByTransactionId(trans.getId());
        transaction.setStatus(trans.getStatus());

        try {
            transRepo.save(transaction);
            if(trans.getStatus().contentEquals("approved")){
                Timestamp time=new Timestamp(System.currentTimeMillis());
                String hash=new BlockChainNode(trans, time).hash;
                BlockChainDao block=new BlockChainDao();
                block.setEntity_id(trans.getId());
                block.setTime(time);
                block.setEntity("transaction");
                block.setHashcode(hash);
                blockRepo.save(block);

            }

            return "success";
        }
        catch(Exception e){
            return "something went wrong, please try again later";
        }
    }

    public List<Transactions> getTransactionsByPatientId(Integer id){

        List<Transactions> finalResult=new ArrayList<Transactions>();
        List<TransactionsDao> listOfTrans=transRepo.findByPatientId(id);

        Iterator<TransactionsDao> itr=listOfTrans.iterator();

        while(itr.hasNext()){
            TransactionsDao p=itr.next();

            Transactions result=new Transactions();
            result.setId(p.getId());
            result.setTransaction_id(p.getTransaction_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setTransaction_type(p.getTransaction_type());
            result.setAmount(p.getAmount());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setNotes(p.getNotes());
            result.setCreated_by(p.getCreated_by());
            result.setApproved_by(p.getApproved_by());
            result.setApproved_by_id(p.getApproved_by_id());
            List<InsuranceClaimDao> subResult=new ArrayList<InsuranceClaimDao>();
            subResult=insClaimRepo.findByPatientId(p.getPatient_id());
            System.out.println(subResult);
            result.setClaim(subResult);

            finalResult.add(result);

        }


        return finalResult;


    }

    public String deleteTransaction(Integer id){


        try {

            transRepo.deleteById(id);
            return "success";
        }
        catch(Exception e){
            return e.toString();
        }
    }

    public  String updateTransaction(Transactions p) {

        TransactionsDao result=new TransactionsDao();
        if(p!=null) {

            result.setId(p.getId());
            result.setTransaction_id(p.getTransaction_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setTransaction_type(p.getTransaction_type());
            result.setAmount(p.getAmount());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setNotes(p.getNotes());
            result.setCreated_by(p.getCreated_by());
            result.setApproved_by(p.getApproved_by());
            result.setApproved_by_id(p.getApproved_by_id());


            try {
                transRepo.save(result);
                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }
        }
        else{
            return "Transaction fields cannot be null";
        }
    }



}
