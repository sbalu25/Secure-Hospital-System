package com.example.security.service;


import com.example.security.entity.HelpTableDao;
import com.example.security.entity.InsurancePolicyDao;
import com.example.security.repository.HelpTableRepository;
import com.example.security.repository.InsurancePolicyRepository;
import models.HelpTable;
import models.InsurancePolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class InsurancePolicyService {

    @Autowired
    private InsurancePolicyRepository insRepo;


    public List<InsurancePolicyDao> getInsurancePolicies(){
        System.out.print(insRepo.findAll().size());
        return insRepo.findAll();
    }

    public String createPolicy(InsurancePolicy policy) {
        InsurancePolicyDao result=new InsurancePolicyDao();
        if(policy!=null) {

            //userappt.setAppointment_id(appointment.getAppointment_id());
            result.setTime(new Timestamp(System.currentTimeMillis()));
            result.setPolicy_name(policy.getPolicy_name());
            result.setCompany_name(policy.getCompany_name());
            result.setCoverage_percentage(policy.getCoverage_percentage());
            result.setGroup_number(UUID.randomUUID().toString());
            result.setCreated_by(policy.getCreated_by());
            result.setCreated_name(policy.getCreated_name());

            try {
                insRepo.save(result);

                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }


        }
        else{

            return "Insurance Policy fields cannot be null";
        }
    }



}
