package com.example.security.service;


import com.example.security.entity.InsuranceClaimDao;
import com.example.security.entity.InsuranceDao;
import com.example.security.repository.InsuranceClaimRepository;
import com.example.security.repository.InsuranceRepository;
import models.Insurance;
import models.InsuranceClaim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class InsuranceService {

    @Autowired
    private InsuranceRepository insRepo;

    public List<InsuranceDao> getInsurances(){
        System.out.print(insRepo.findAll());
        return insRepo.findAll();
    }
    public String createInsurance(Insurance ins) {
        InsuranceDao result=new InsuranceDao();
        if(ins!=null) {

            result.setPatient_id(ins.getPatient_id());
            result.setInsurance_id(ins.getInsurance_id());
            result.setPolicy_name(ins.getPolicy_name());
            result.setPatient_name(ins.getPatient_name());
            result.setGroup_number(ins.getGroup_number());
            result.setDate_of_birth(ins.getDate_of_birth());
            result.setInsurance_company(ins.getInsurance_company());
            result.setCreated_by(ins.getCreated_by());
            result.setCreated_time(new Timestamp(System.currentTimeMillis()));
            result.setAddress(ins.getAddress());
            result.setState(ins.getState());
            result.setCity(ins.getCity());
            result.setCountry(ins.getCountry());



            try {
                insRepo.save(result);

                return "success";
            } catch (Exception e) {
                System.out.println(e);
                return "something went wrong, please try again!";
            }


        }
        else{

            return "Insurance  fields fields cannot be null";
        }
    }

    public List<InsuranceDao> getInsuranceByPatientId(Integer id){


        List<InsuranceDao> list=insRepo.findByPatientId(id);

        return list;


    }

}
