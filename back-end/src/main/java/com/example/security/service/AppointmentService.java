package com.example.security.service;


import com.example.security.entity.*;
import com.example.security.repository.AppointmentRepository;
import com.example.security.repository.UserRepository;
import models.AppointmentBooking;
import models.CustomerRegistration;
import models.Prescriptions;
import models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository apptRepo;


    public List<AppointmentsDao> getAppointments(){
        System.out.print(apptRepo.findAll().size());
        return apptRepo.findAll();
    }

    public String makeAnAppointment(AppointmentBooking appointment) {

        AppointmentsDao userappt=new AppointmentsDao();
        if(appointment!=null) {

            //userappt.setAppointment_id(appointment.getAppointment_id());
            userappt.setDoctor_id(appointment.getDoctor_id());
            userappt.setPatient_id(appointment.getPatient_id());
            userappt.setDoctor_name(appointment.getDoctor_name());
            userappt.setPatient_name(appointment.getPatient_name());
            userappt.setCreated_by(appointment.getCreated_by());
            userappt.setTime(appointment.getTime());
            userappt.setSpeciality(appointment.getSpeciality());
            userappt.setStatus(appointment.getStatus());
            userappt.setCreated_time(new Timestamp(System.currentTimeMillis()));

            try {
                apptRepo.save(userappt);

                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }


        }
        else{

            return "appointment fields cannot be null";
        }
    }
    public String authorizeAppoinments(AppointmentBooking appt){
        AppointmentsDao appointment=apptRepo.findByAppointmentId(appt.getAppointment_id());
        appointment.setStatus(appt.getStatus());
        try {
            apptRepo.save(appointment);
            return "success";
        }
        catch(Exception e){
            return "something went wrong, please try again later";
        }
    }

    public List<AppointmentBooking> getAppointmentsByPatientId(Integer id){

        List<AppointmentBooking> finalResult=new ArrayList<AppointmentBooking>();
        List<AppointmentsDao> listOfAppt=apptRepo.findByPatientId(id);

        Iterator<AppointmentsDao> itr=listOfAppt.iterator();

        while(itr.hasNext()){
            AppointmentsDao p=itr.next();

            AppointmentBooking result=new AppointmentBooking();
            result.setAppointment_id(p.getAppointment_id());
            result.setPatient_id(p.getPatient_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setDoctor_name(p.getDoctor_name());
            result.setPatient_name(p.getPatient_name());
            result.setSpeciality(p.getSpeciality());
            result.setCreated_by(p.getCreated_by());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setCreated_time(p.getCreated_time());
            finalResult.add(result);
        }


        return finalResult;


    }

    public List<AppointmentBooking> getAppointmentsByDoctorId(Integer id){

        List<AppointmentBooking> finalResult=new ArrayList<AppointmentBooking>();
        List<AppointmentsDao> listOfPres=apptRepo.findByDoctorId(id);

        Iterator<AppointmentsDao> itr=listOfPres.iterator();

        while(itr.hasNext()){
            AppointmentsDao p=itr.next();

            AppointmentBooking result=new AppointmentBooking();
            result.setAppointment_id(p.getAppointment_id());
            result.setPatient_id(p.getPatient_id());
            result.setDoctor_id(p.getDoctor_id());
            result.setDoctor_name(p.getDoctor_name());
            result.setPatient_name(p.getPatient_name());
            result.setSpeciality(p.getSpeciality());
            result.setCreated_by(p.getCreated_by());
            result.setStatus(p.getStatus());
            result.setTime(p.getTime());
            result.setCreated_time(p.getCreated_time());
            finalResult.add(result);
        }


        return finalResult;


    }
}

