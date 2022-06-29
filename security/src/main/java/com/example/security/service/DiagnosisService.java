package com.example.security.service;


import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.DiagnosisDao;
import com.example.security.entity.DrugsDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.repository.DiagnosisRepository;
import com.example.security.repository.PrescriptionsRepository;
import models.AppointmentBooking;
import models.Diagnosis;
import models.Prescriptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class DiagnosisService {

    @Autowired
    private DiagnosisRepository diagRepo;


    public List<DiagnosisDao> getDiagnosis(){
        System.out.print(diagRepo.findAll().size());
        return diagRepo.findAll();
    }

    public  String createDiagnosis(Diagnosis diag) {

        DiagnosisDao createDiag=new DiagnosisDao();
        if(diag!=null) {

            //userappt.setAppointment_id(appointment.getAppointment_id());
            createDiag.setDoctor_id(diag.getDoctor_id());
            createDiag.setPatient_id(diag.getPatient_id());
            createDiag.setDoctor_name(diag.getDoctor_name());
            createDiag.setPatient_name(diag.getPatient_name());
            createDiag.setSymptoms(diag.getSymptoms());
            createDiag.setPrevious_medications(diag.getPrevious_medications());
            createDiag.setDrug_history(diag.getDrug_history());
            createDiag.setNotes(diag.getNotes());
            createDiag.setTime(diag.getTime());


            try {
                diagRepo.save(createDiag);
                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }
        }
        else{
            return "Diagnosis fields cannot be null";
        }
    }

    public String deleteDiagnosis(Integer id){

        try {
            diagRepo.deleteById(id);
            return "success";
        }
        catch(Exception e){
            return "something went wrong, please try again!";
        }

    }

    public  String updateDiagnosis(Diagnosis diag) {

        DiagnosisDao createDiag=new DiagnosisDao();
        if(diag!=null) {

            createDiag.setDiagnosis_id(diag.getDiagnosis_id());
            createDiag.setDoctor_id(diag.getDoctor_id());
            createDiag.setPatient_id(diag.getPatient_id());
            createDiag.setPatient_name(diag.getPatient_name());
            createDiag.setDoctor_name(diag.getDoctor_name());
            createDiag.setSymptoms(diag.getSymptoms());
            createDiag.setPrevious_medications(diag.getPrevious_medications());
            createDiag.setDrug_history(diag.getDrug_history());
            createDiag.setNotes(diag.getNotes());
            createDiag.setTime(diag.getTime());


            try {
                diagRepo.save(createDiag);
                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }
        }
        else{
            return "Diagnosis fields cannot be null";
        }
    }
    public List<DiagnosisDao> getDiagnosisByPatientId(Integer id){


        List<DiagnosisDao> listOfDiag=diagRepo.findByPatientId(id);

        return listOfDiag;


    }

    public List<DiagnosisDao> getDiagnosisByDoctorId(Integer id){


        List<DiagnosisDao> listOfDiag=diagRepo.findByDoctorId(id);

        return listOfDiag;


    }
}
