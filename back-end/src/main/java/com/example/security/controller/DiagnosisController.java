package com.example.security.controller;



import com.example.security.entity.DiagnosisDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.service.DiagnosisService;
import com.example.security.service.PrescriptionService;
import models.Diagnosis;
import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("diagnosis")
public class DiagnosisController {

    @Autowired
    private DiagnosisService diagService;

    @GetMapping("/list")
    public List<DiagnosisDao> getDiagnosis(){
        return diagService.getDiagnosis();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createDiagnosis(@RequestBody Diagnosis diag){
        String result=diagService.createDiagnosis(diag);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/delete")
    public ResponseEntity<String> deleteDiagnosis(@RequestParam String id){
        String result=diagService.deleteDiagnosis(Integer.parseInt(id));
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateDiagnosis(@RequestBody Diagnosis diag){
        String result=diagService.updateDiagnosis(diag);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listByPatientId")
    public List<DiagnosisDao> getDiagnosisByPatientId(@RequestParam String id){
        return diagService.getDiagnosisByPatientId(Integer.parseInt(id));
    }

    @GetMapping("/listByDoctorId")
    public List<DiagnosisDao> getDiagnosisByDoctorId(@RequestParam String id){
        return diagService.getDiagnosisByDoctorId(Integer.parseInt(id));
    }

}
