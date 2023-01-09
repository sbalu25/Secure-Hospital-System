package com.example.security.controller;


import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.LabtestsDao;
import com.example.security.service.AppointmentService;
import com.example.security.service.LabTestsService;
import models.Diagnosis;
import models.LabTests;
import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lab_tests")
public class LabTestsController {

    @Autowired
    private LabTestsService labTestService;

    @GetMapping("/list")
    public List<LabTests> getLabTestService(){

        return labTestService.getLabTests();
    }
    @PostMapping("/create")
    public ResponseEntity<String> createLabTest(@RequestBody LabTests labtest){
        String result=labTestService.createLabTest(labtest);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listByPatientId")
    public List<LabTests> getLabtestsByPatientId(@RequestParam String id){
        return labTestService.getLabtestsByPatientId(Integer.parseInt(id));
    }

    @GetMapping("/listByDoctorId")
    public List<LabTests> getLabtestsByDoctorId(@RequestParam String id){
        return labTestService.getLabtestsByDoctorId(Integer.parseInt(id));
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateLabTests(@RequestBody LabTests labTests){
        String result=labTestService.updateLabTests(labTests);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/authorize")
    public ResponseEntity<String> authorizeLabTests(@RequestBody LabTests labTests){
        String result=labTestService.authorizeLabTests(labTests);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/delete")
    public ResponseEntity<String> deleteLabTest(@RequestParam String id){
        String result=labTestService.deleteLabTest(Integer.parseInt(id));
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }


}
