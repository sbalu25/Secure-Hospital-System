package com.example.security.controller;


import com.example.security.entity.AppointmentsDao;
import com.example.security.service.AppointmentService;
import models.AppointmentBooking;
import models.LabTests;
import models.Transactions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService apptService;

    @PostMapping("/makeAppointment")
    public ResponseEntity<String> makeAppointment(@RequestBody AppointmentBooking appointment){
        String result=apptService.makeAnAppointment(appointment);
        if(result.contentEquals("success")){
            return new ResponseEntity<String>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list")
    public List<AppointmentsDao> getAppointments(){
        return apptService.getAppointments();
    }

    @PostMapping("/authorize")
    public ResponseEntity<String> authorizeAppointments(@RequestBody AppointmentBooking appt){
        String result=apptService.authorizeAppoinments(appt);
        if(result=="success"){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listByPatientId")
    public List<AppointmentBooking> getAppointmentsByPatientId(@RequestParam String id){
        return apptService.getAppointmentsByPatientId(Integer.parseInt(id));
    }

    @GetMapping("/listByDoctorId")
    public List<AppointmentBooking> getAppointmentsByDoctorId(@RequestParam String id){
        return apptService.getAppointmentsByDoctorId(Integer.parseInt(id));
    }


}
