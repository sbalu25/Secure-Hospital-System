package com.example.security.controller;


import com.example.security.entity.HelpTableDao;
import com.example.security.entity.InsurancePolicyDao;
import com.example.security.service.HelpTableService;
import com.example.security.service.InsurancePolicyService;
import models.HelpTable;
import models.InsurancePolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("insurancePolicy")
public class InsurancePolicyController {

    @Autowired
    private InsurancePolicyService insService;

    @GetMapping("/list")
    public List<InsurancePolicyDao> getInsurancePolicies(){

        return insService.getInsurancePolicies();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createPolicy(@RequestBody InsurancePolicy policy){
        String result=insService.createPolicy(policy);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}
