package com.example.security.service;


import com.example.security.entity.BlockChainDao;
import com.example.security.entity.DiagnosisDao;
import com.example.security.entity.InsuranceClaimDao;
import com.example.security.entity.InsurancePolicyDao;
import com.example.security.repository.BlockChainRepository;
import com.example.security.repository.HelpTableRepository;
import com.example.security.repository.InsuranceClaimRepository;
import com.example.security.repository.InsurancePolicyRepository;
import models.BlockChainNode;
import models.InsuranceClaim;
import models.InsurancePolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class InsuranceClaimService {


    @Autowired
    private InsuranceClaimRepository insClaimRepo;

    @Autowired
    private BlockChainRepository blockRepo;


    public List<InsuranceClaimDao> getInsuranceClaims(){
        System.out.print(insClaimRepo.findAll());
        return insClaimRepo.findAll();
    }

    public String createInsuranceClaim(InsuranceClaim claim) {
        InsuranceClaimDao result=new InsuranceClaimDao();
        if(claim!=null) {

           result.setPatient_id(claim.getPatient_id());
           result.setPolicy_id(claim.getPolicy_id());
           result.setPolicy_name(claim.getPolicy_name());
           result.setTransaction_id(claim.getTransaction_id());
           result.setPatient_name(claim.getPatient_name());
           result.setPatient_email(claim.getPatient_email());
           result.setAmount_claimed(claim.getAmount_claimed());
           result.setGroup_number(claim.getGroup_number());
           result.setStatus(claim.getStatus());
           result.setCreated_time(new Timestamp(System.currentTimeMillis()));
           result.setCreated_by(claim.getCreated_by());
           result.setUpdated_time(new Timestamp(System.currentTimeMillis()));
           result.setUpdated_by(claim.getUpdated_by());
           result.setComments(claim.getComments());


            try {
                insClaimRepo.save(result);

                return "success";
            } catch (Exception e) {
                System.out.println(e);
                return "something went wrong, please try again!";
            }


        }
        else{

            return "Insurance claim fields fields cannot be null";
        }
    }

    public List<InsuranceClaimDao> getClaimsByPatientId(Integer id){


        List<InsuranceClaimDao> listOfClaims=insClaimRepo.findByPatientId(id);

        return listOfClaims;


    }

    public String authorizeClaim(InsuranceClaim claim) {
        InsuranceClaimDao result=new InsuranceClaimDao();
        if(claim!=null) {
            result.setId(claim.getId());
            result.setPatient_id(claim.getPatient_id());
            result.setPolicy_id(claim.getPolicy_id());
            result.setPolicy_name(claim.getPolicy_name());
            result.setTransaction_id(claim.getTransaction_id());
            result.setPatient_name(claim.getPatient_name());
            result.setPatient_email(claim.getPatient_email());
            result.setAmount_claimed(claim.getAmount_claimed());
            result.setGroup_number(claim.getGroup_number());
            result.setStatus(claim.getStatus());
            result.setCreated_time(new Timestamp(System.currentTimeMillis()));
            result.setCreated_by(claim.getCreated_by());
            result.setUpdated_time(new Timestamp(System.currentTimeMillis()));
            result.setUpdated_by(claim.getUpdated_by());
            result.setComments(claim.getComments());


            try {
                insClaimRepo.save(result);

                if(claim.getStatus().contentEquals("approved")){
                    Timestamp time=new Timestamp(System.currentTimeMillis());
                    String hash=new BlockChainNode(claim, time).hash;
                    BlockChainDao block=new BlockChainDao();
                    block.setEntity_id(claim.getId());
                    block.setTime(time);
                    block.setEntity("insurance_claim");
                    block.setHashcode(hash);
                    blockRepo.save(block);

                }
                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }


        }
        else{

            return "Insurance claim fields fields cannot be null";
        }
    }



}
