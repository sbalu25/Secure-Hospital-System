package com.example.security.controller;


import com.example.security.entity.DiagnosisDao;
import com.example.security.entity.HelpTableDao;
import com.example.security.service.HelpTableService;
import com.example.security.service.LabTestsService;
import models.Diagnosis;
import models.HelpTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("helpTable")
public class HelpTableController {

    @Autowired
    private HelpTableService helpService;

    @GetMapping("/list")
    public List<HelpTableDao> getHelpRequests(){

        return helpService.getHelpRequests();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createHelp(@RequestBody HelpTable help){
        String result=helpService.createHelp(help);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/update")
    public ResponseEntity<String> updateHelpRequest(@RequestBody HelpTable help){
        String result=helpService.updateHelpRequest(help);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

}
