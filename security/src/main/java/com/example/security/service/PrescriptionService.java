package com.example.security.service;


import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.DrugsDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.repository.AppointmentRepository;
import com.example.security.repository.DrugsRepository;
import com.example.security.repository.PrescriptionsRepository;
import models.AppointmentBooking;
import models.Drugs;
import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionsRepository presRepo;

    @Autowired
    private DrugsRepository drugRepo;

    public List<Prescriptions> getPrescriptions(){
        List<Prescriptions> finalResult=new ArrayList<Prescriptions>();
        List<PrescriptionsDao> listOfPres=presRepo.findAll();
        Iterator<PrescriptionsDao> itr=listOfPres.iterator();

        while(itr.hasNext()){
            PrescriptionsDao p=itr.next();
            List<DrugsDao> d=drugRepo.findByPrescriptionId(p.getPrescription_id());
            Prescriptions result=new Prescriptions();
            result.setPrescription_id(p.getPrescription_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setDoctor_name(p.getDoctor_name());
            result.setDrugs(d);
            result.setTime(p.getTime());
            finalResult.add(result);
        }
        return finalResult;

    }

    public List<Prescriptions> getPrescriptionsByPatientId(Integer id){

        List<Prescriptions> finalResult=new ArrayList<Prescriptions>();
        List<PrescriptionsDao> listOfPres=presRepo.findByPatientId(id);

        Iterator<PrescriptionsDao> itr=listOfPres.iterator();

        while(itr.hasNext()){
            PrescriptionsDao p=itr.next();
            List<DrugsDao> d=drugRepo.findByPrescriptionId(p.getPrescription_id());
            Prescriptions result=new Prescriptions();
            result.setPrescription_id(p.getPrescription_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setDoctor_name(p.getDoctor_name());
            result.setPatient_name(p.getPatient_name());
            result.setDrugs(d);
            result.setTime(p.getTime());
            finalResult.add(result);
        }


        return finalResult;


    }
    public List<Prescriptions> getPrescriptionsByDoctorId(Integer id){
        List<Prescriptions> finalResult=new ArrayList<Prescriptions>();
        List<PrescriptionsDao> listOfPres=presRepo.findByDoctorId(id);

        Iterator<PrescriptionsDao> itr=listOfPres.iterator();

        while(itr.hasNext()){
            PrescriptionsDao p=itr.next();
            List<DrugsDao> d=drugRepo.findByPrescriptionId(p.getPrescription_id());
            Prescriptions result=new Prescriptions();
            result.setPrescription_id(p.getPrescription_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setPatient_id(p.getPatient_id());
            result.setPatient_name(p.getPatient_name());
            result.setDoctor_name(p.getDoctor_name());
            result.setDrugs(d);
            result.setTime(p.getTime());
            finalResult.add(result);
        }


        return finalResult;

    }


    public String registerPrescription(Prescriptions pres) {

        PrescriptionsDao userPres=new PrescriptionsDao();

        if(pres!=null) {

            //userPres.setPrescription_id(pres.getPrescription_id());
            userPres.setDoctor_id(pres.getDoctor_id());
            userPres.setPatient_id(pres.getPatient_id());
            userPres.setDoctor_name(pres.getDoctor_name());
            userPres.setPatient_name(pres.getPatient_name());
            userPres.setTime(pres.getTime());

            try {
                presRepo.save(userPres);
                Iterator<DrugsDao> itr = pres.getDrugs().iterator();

                while (itr.hasNext()) {
                    DrugsDao drugs = new DrugsDao();
                    DrugsDao dum = itr.next();
//                drugs.setDrugs_id(dum.getDrugs_id());
                    drugs.setPrescription_id(userPres.getPrescription_id());
                    drugs.setDrug_name(dum.getDrug_name());
                    drugs.setDosage(dum.getDosage());
                    drugs.setFrequency(dum.getFrequency());
                    drugs.setUnits(dum.getUnits());

                    drugRepo.save(drugs);

                }


                return "success";

            }
            catch (Exception e){
                return "something went wrong, please try again later";
            }


        }
        else{

            return "prescriptions fields cannot be null";
        }
    }

}
