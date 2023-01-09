package com.example.security.service;

import com.example.security.entity.*;
import com.example.security.repository.AppointmentRepository;
import com.example.security.repository.LabTestsRepository;
import com.example.security.repository.TestsRepository;
import models.AppointmentBooking;
import models.LabTests;
import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class LabTestsService {

    @Autowired
    private LabTestsRepository labTestRepo;

    @Autowired
    private TestsRepository testRepo;

    public List<LabTests> getLabTests(){

        List<LabTests> finalResult=new ArrayList<LabTests>();
        List<LabtestsDao> listOflabs=labTestRepo.findAll();

        Iterator<LabtestsDao> itr=listOflabs.iterator();

        while(itr.hasNext()){
            LabtestsDao p=itr.next();
            List<TestsDao> d=testRepo.findByLabId(p.getLab_id());
            LabTests result=new LabTests();

            result.setLab_id(p.getLab_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setDoctor_name(p.getDoctor_name());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setApproved_by(p.getApproved_by());
            result.setTests(d);

            finalResult.add(result);
        }


        return finalResult;


    }

    public List<LabTests> getLabtestsByPatientId(Integer id){

        List<LabTests> finalResult=new ArrayList<LabTests>();
        List<LabtestsDao> listOflabs=labTestRepo.findByPatientId(id);

        Iterator<LabtestsDao> itr=listOflabs.iterator();

        while(itr.hasNext()){
            LabtestsDao p=itr.next();
            List<TestsDao> d=testRepo.findByLabId(p.getLab_id());
            LabTests result=new LabTests();

            result.setLab_id(p.getLab_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setDoctor_name(p.getDoctor_name());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setApproved_by(p.getApproved_by());
            result.setTests(d);

            finalResult.add(result);
        }


        return finalResult;


    }
    public List<LabTests> getLabtestsByDoctorId(Integer id){

        List<LabTests> finalResult=new ArrayList<LabTests>();
        List<LabtestsDao> listOflabs=labTestRepo.findByDoctorId(id);

        Iterator<LabtestsDao> itr=listOflabs.iterator();

        while(itr.hasNext()){
            LabtestsDao p=itr.next();
            List<TestsDao> d=testRepo.findByLabId(p.getLab_id());
            LabTests result=new LabTests();

            result.setLab_id(p.getLab_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setDoctor_name(p.getDoctor_name());
            result.setPatient_name(p.getPatient_name());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setApproved_by(p.getApproved_by());
            result.setTests(d);

            finalResult.add(result);
        }


        return finalResult;


    }

    public String createLabTest(LabTests labTest) {

        LabtestsDao test=new LabtestsDao();

        if(labTest!=null) {

            //userPres.setPrescription_id(pres.getPrescription_id());

            test.setDoctor_id(labTest.getDoctor_id());
            test.setPatient_id(labTest.getPatient_id());
            test.setDoctor_name(labTest.getDoctor_name());
            test.setPatient_name(labTest.getPatient_name());
            test.setStatus(labTest.getStatus());
            test.setTime(labTest.getTime());
            System.out.println(test.toString());
            try {
                labTestRepo.save(test);
                System.out.println(test.toString());

                Iterator<TestsDao> itr = labTest.getTests().iterator();

                while (itr.hasNext()) {
                    TestsDao tests = new TestsDao();
                    TestsDao dum = itr.next();

                    //tests.setTest_id(tests.getTest_id());
                    tests.setLab_id(test.getLab_id());
                    tests.setTest_name(dum.getTest_name());
                    tests.setSample_type(dum.getSample_type());
                    tests.setStatus(dum.getStatus());
                    tests.setResult(dum.getResult());
                    tests.setTime(dum.getTime());
                    System.out.println(tests.toString());
                    testRepo.save(tests);

                }


                return "success";
            }
            catch (Exception e){
                return "something went wrong,please try again later";
            }


        }
        else{

            return "labtests fields cannot be null";
        }
    }

    public String updateLabTests(LabTests labTest){

        LabtestsDao test=new LabtestsDao();

        if(labTest!=null) {


            test.setLab_id(labTest.getLab_id());
            test.setDoctor_id(labTest.getDoctor_id());
            test.setPatient_id(labTest.getPatient_id());
            test.setPatient_name(labTest.getPatient_name());
            test.setDoctor_name(labTest.getDoctor_name());
            test.setStatus(labTest.getStatus());
            test.setApproved_by(labTest.getApproved_by());
            test.setTime(labTest.getTime());

            try {
                labTestRepo.save(test);
                Iterator<TestsDao> itr = labTest.getTests().iterator();

                while (itr.hasNext()) {
                    TestsDao tests = new TestsDao();
                    TestsDao dum = itr.next();

                    tests.setTest_id(dum.getTest_id());

                    tests.setLab_id(test.getLab_id());
                    tests.setTest_name(dum.getTest_name());
                    tests.setSample_type(dum.getSample_type());
                    tests.setStatus(dum.getStatus());
                    tests.setResult(dum.getResult());
                    tests.setTime(dum.getTime());
                    System.out.println(tests.toString());
                    testRepo.save(tests);

                }
                return "success";
            }
            catch (Exception e){
                return "something went wrong, please try again later";
            }



        }
        else{

            return "labtests fields cannot be null";
        }
    }

    public String authorizeLabTests(LabTests labTest){
        LabtestsDao labTestReport=labTestRepo.findByLabId(labTest.getLab_id());
        labTestReport.setStatus(labTest.getStatus());
        try {
            labTestRepo.save(labTestReport);
            return "success";
        }
        catch(Exception e){
            return "something went wrong, please try again later";
        }
    }
    public String deleteLabTest(Integer id){
        List<TestsDao> test=testRepo.findByLabId(id);

        Iterator<TestsDao> itr = test.iterator();

        while(itr.hasNext()){

            TestsDao dum = itr.next();
            testRepo.deleteById(dum.getTest_id());


        }

        try {
            labTestRepo.deleteById(id);
            return "success";
        }
        catch(Exception e){
            return "something went wrong, please try again!";
        }

    }

}
