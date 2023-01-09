package com.example.security.service;



import com.example.security.entity.HelpTableDao;
import com.example.security.repository.HelpTableRepository;
import models.HelpTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class HelpTableService {

    @Autowired
    private HelpTableRepository helpRepo;


    public List<HelpTableDao> getHelpRequests(){
        System.out.print(helpRepo.findAll().size());
        return helpRepo.findAll();
    }

    public String createHelp(HelpTable help) {
        HelpTableDao helpEntry=new HelpTableDao();
        if(help!=null) {

            //userappt.setAppointment_id(appointment.getAppointment_id());
         helpEntry.setPatient_id(help.getPatient_id());
         helpEntry.setPatient_name(help.getPatient_name());
         helpEntry.setPatient_mail(help.getPatient_mail());
         helpEntry.setRequest(help.getRequest());
         helpEntry.setAddressed_by(help.getAddressed_by());
         helpEntry.setAddressed_name(help.getAddressed_name());
         helpEntry.setStatus(help.getStatus());
         helpEntry.setCreated_time(new Timestamp(System.currentTimeMillis()));
         helpEntry.setUpdated_time(new Timestamp(System.currentTimeMillis()));

            try {
                helpRepo.save(helpEntry);

                return "success";
            } catch (Exception e) {
                System.out.println(e);
                return "something went wrong, please try again!";
            }


        }
        else{

            return "Help Table fields cannot be null";
        }
    }

    public String updateHelpRequest(HelpTable help){
        HelpTableDao helpEntry=new HelpTableDao();
        if(help!=null) {

            //userappt.setAppointment_id(appointment.getAppointment_id());
            helpEntry.setId(help.getId());
            helpEntry.setPatient_id(help.getPatient_id());
            helpEntry.setPatient_name(help.getPatient_name());
            helpEntry.setPatient_mail(help.getPatient_mail());
            helpEntry.setRequest(help.getRequest());
            helpEntry.setAddressed_by(help.getAddressed_by());
            helpEntry.setAddressed_name(help.getAddressed_name());
            helpEntry.setStatus(help.getStatus());
            helpEntry.setUpdated_time(new Timestamp(System.currentTimeMillis()));

            try {
                helpRepo.save(helpEntry);

                return "success";
            } catch (Exception e) {
                return "something went wrong, please try again!";
            }


        }
        else{

            return "appointment fields cannot be null";
        }
    }
}
