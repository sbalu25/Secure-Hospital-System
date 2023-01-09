package com.example.security.service;

import com.example.security.entity.*;
import com.example.security.repository.BillRepository;
import com.example.security.repository.BlockChainRepository;
import com.example.security.repository.InsuranceClaimRepository;
import com.example.security.repository.TransactionsRepository;
import models.Bill;
import models.HelpTable;
import models.LabTests;
import models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private TransactionsRepository transRepo;

    @Autowired
    private InsuranceClaimRepository insClaimRepo;


    public List<BillDao> getListOfBills(){
        System.out.print(billRepo.findAll().size());
        return billRepo.findAll();
    }

    public List<Bill> getBills(){
        List<BillDao> billList=billRepo.findAll();
        Iterator<BillDao> itr=billList.iterator();
        List<Bill> finalResult=new ArrayList<Bill>();

        while(itr.hasNext()){
            BillDao dum=itr.next();
            Bill billResult=new Bill();

            TransactionsDao p=transRepo.findByTransactionId(dum.getTransaction_id());
            List<Transactions> transList=new ArrayList<Transactions>();



                Transactions result=new Transactions();
                result.setId(p.getId());
                result.setTransaction_id(p.getTransaction_id());
                result.setPatient_id(p.getPatient_id());
                result.setPatient_name(p.getPatient_name());
                result.setTransaction_type(p.getTransaction_type());
                result.setAmount(p.getAmount());
                result.setStatus(p.getStatus());
                result.setTime(p.getTime());
                result.setNotes(p.getNotes());
                result.setCreated_by(p.getCreated_by());
                result.setApproved_by(p.getApproved_by());
                result.setApproved_by_id(p.getApproved_by_id());
                List<InsuranceClaimDao> subResult=new ArrayList<InsuranceClaimDao>();

                subResult=insClaimRepo.findByPatientId(p.getPatient_id());
                System.out.println(subResult);
                result.setClaim(subResult);
                transList.add(result);


                billResult.setId(dum.getId());
                billResult.setTransaction_id(dum.getTransaction_id());
                billResult.setPatient_id(dum.getPatient_id());
                billResult.setInsurance_id(dum.getInsurance_id());
                billResult.setCreated_id(dum.getCreated_id());
                billResult.setCreated_name(dum.getCreated_name());
                billResult.setCreated_time(dum.getCreated_time());
                billResult.setTransactions(transList);


                finalResult.add(billResult);

            }
        return finalResult;
        }



    public String createBill(Bill bill) {
        BillDao billEntry=new BillDao();
        if(bill!=null) {

            billEntry.setTransaction_id(bill.getTransaction_id());
            billEntry.setPatient_id(bill.getPatient_id());
            billEntry.setCreated_time(new Timestamp(System.currentTimeMillis()));
            billEntry.setCreated_name(bill.getCreated_name());
            billEntry.setInsurance_id(bill.getInsurance_id());
            billEntry.setCreated_id(bill.getCreated_id());



            try {
                billRepo.save(billEntry);

                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }


        }
        else{

            return "bill Table fields cannot be null";
        }
    }
    public List<Bill> getBillByPatientId(Integer id){

        List<Bill> finalResult=new ArrayList<Bill>();
        List<BillDao> listOfBills=billRepo.findByPatientId(id);

        Iterator<BillDao> itr=listOfBills.iterator();

        while(itr.hasNext()){
            BillDao dum=itr.next();
            Bill billResult=new Bill();

            TransactionsDao p=transRepo.findByTransactionId(dum.getTransaction_id());
            List<Transactions> transList=new ArrayList<Transactions>();



            Transactions result=new Transactions();
            result.setId(p.getId());
            result.setTransaction_id(p.getTransaction_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setTransaction_type(p.getTransaction_type());
            result.setAmount(p.getAmount());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setNotes(p.getNotes());
            result.setCreated_by(p.getCreated_by());
            result.setApproved_by(p.getApproved_by());
            result.setApproved_by_id(p.getApproved_by_id());
            List<InsuranceClaimDao> subResult=new ArrayList<InsuranceClaimDao>();

            subResult=insClaimRepo.findByPatientId(p.getPatient_id());
            System.out.println(subResult);
            result.setClaim(subResult);
            transList.add(result);


            billResult.setId(dum.getId());
            billResult.setTransaction_id(dum.getTransaction_id());
            billResult.setPatient_id(dum.getPatient_id());
            billResult.setInsurance_id(dum.getInsurance_id());
            billResult.setCreated_id(dum.getCreated_id());
            billResult.setCreated_name(dum.getCreated_name());
            billResult.setCreated_time(dum.getCreated_time());
            billResult.setTransactions(transList);


            finalResult.add(billResult);


        }


        return finalResult;


    }




}
