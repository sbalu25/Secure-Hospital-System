package com.example.security.controller;


import com.example.security.entity.InsuranceClaimDao;
import com.example.security.entity.InsuranceDao;
import com.example.security.service.InsurancePolicyService;
import com.example.security.service.InsuranceService;
import models.Insurance;
import models.InsuranceClaim;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("insurance")
public class InsuranceController {

    @Autowired
    private InsuranceService insService;

    @GetMapping("/list")
    public List<InsuranceDao> getInsurances(){

        return insService.getInsurances();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createInsurance(@RequestBody Insurance ins){
        String result=insService.createInsurance(ins);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/listByPatientId")
    public List<InsuranceDao> getInsuranceByPatientId(@RequestParam Integer id){
        return insService.getInsuranceByPatientId(id);
    }
}
