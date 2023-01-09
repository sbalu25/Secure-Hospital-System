package com.example.security.controller;

import com.example.security.entity.BillDao;
import com.example.security.entity.BlockChainDao;
import com.example.security.entity.DiagnosisDao;
import com.example.security.service.BillService;
import com.example.security.service.DiagnosisService;
import models.Bill;
import models.Diagnosis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("bill")
public class BillController {

    @Autowired
    private BillService billService;


    @GetMapping("/list")
    public List<BillDao> getListOfBills(){
        return billService.getListOfBills();
    }

    @GetMapping("/getBills")
    public List<Bill> getBills(){
        return billService.getBills();
    }

    @PostMapping("/create")
    public ResponseEntity<String> createBill(@RequestBody Bill bill){
        String result=billService.createBill(bill);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getBillByPatientId")
    public List<Bill> getBillByPatientId(@RequestParam String id){
        return billService.getBillByPatientId(Integer.parseInt(id));
    }
}
