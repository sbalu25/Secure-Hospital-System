package com.example.security.controller;


import com.example.security.entity.PrescriptionsDao;
import com.example.security.entity.TransactionsDao;
import com.example.security.service.PrescriptionService;
import com.example.security.service.TransactionsService;
import models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transactions")
public class TransactionsController {

    @Autowired
    private TransactionsService transService;

    @GetMapping("/list")
    public List<Transactions> getTransactions(){
        return transService.getTransactions();
    }

    @PostMapping("/create")
    public ResponseEntity<String> registerPrescription(@RequestBody Transactions trans){
        String result=transService.createTransactions(trans);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/authorize")
    public ResponseEntity<String> authorizeTransactions(@RequestBody Transactions trans){
        String result=transService.authorizeTransactions(trans);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listByPatientId")
    public List<Transactions> getTransactionsByPatientId(@RequestParam String id){
        return transService.getTransactionsByPatientId(Integer.parseInt(id));
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteTransaction(@RequestParam String id){
        String result=transService.deleteTransaction(Integer.parseInt(id));
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTransaction(@RequestBody Transactions trans){
        String result=transService.updateTransaction(trans);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }


}
