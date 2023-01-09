package com.example.security.controller;


import com.example.security.entity.InsuranceClaimDao;
import com.example.security.entity.InsurancePolicyDao;
import com.example.security.service.InsuranceClaimService;
import com.example.security.service.InsurancePolicyService;
import models.AppointmentBooking;
import models.HelpTable;
import models.InsuranceClaim;
import models.InsurancePolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("insuranceClaim")
public class InsuranceClaimController {

    @Autowired
    private InsuranceClaimService insClaimService;

    @GetMapping("/list")
    public List<InsuranceClaimDao> getInsuranceClaims(){

        return insClaimService.getInsuranceClaims();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createInsuranceClaim(@RequestBody InsuranceClaim claim){
        String result=insClaimService.createInsuranceClaim(claim);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/listByPatientId")
    public List<InsuranceClaimDao> getClaimsByPatientId(@RequestParam Integer id){
        return insClaimService.getClaimsByPatientId(id);
    }

    @PostMapping("/update")
    public ResponseEntity<String> authorizeClaim(@RequestBody InsuranceClaim claim){
        String result=insClaimService.authorizeClaim(claim);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
}


