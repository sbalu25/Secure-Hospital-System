package com.example.security.controller;



import com.example.security.entity.PrescriptionsDao;
import com.example.security.service.PrescriptionService;

import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("prescriptions")
public class PrescriptionController {

    @Autowired
    private PrescriptionService presService;

    @PostMapping("/create")
    public ResponseEntity<String> registerPrescription(@RequestBody Prescriptions prescript){
        String result=presService.registerPrescription(prescript);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/list")
    public List<Prescriptions> getPrescriptions(){
        return presService.getPrescriptions();
    }

    @GetMapping("/listByPatientId")
    public List<Prescriptions> getPrescriptionsByPatientId(@RequestParam String id){
        return presService.getPrescriptionsByPatientId(Integer.parseInt(id));
    }

    @GetMapping("/listByDoctorId")
    public List<Prescriptions> getPrescriptionsByDoctorId(@RequestParam String id){
        return presService.getPrescriptionsByDoctorId(Integer.parseInt(id));
    }


}
