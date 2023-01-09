package com.example.security.service;

import com.example.security.config.JwtTokenUtil;
import com.example.security.entity.DoctorDao;
import com.example.security.entity.PatientDao;
import com.example.security.entity.SignInHistoryDao;
import com.example.security.entity.UserDao;
import com.example.security.repository.DoctorRepository;
import com.example.security.repository.PatientRepository;
import com.example.security.repository.SignInHistoryRepository;
import com.example.security.repository.UserRepository;
import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private SignInHistoryRepository signInRepo;



    public List<UserDao> getUsers(String email){
        UserDao checkScope=repository.findByEmail(email);
        if(!checkScope.getRole().contentEquals("patient")) {
            List<UserDao> arr = repository.findAll();
            List<UserDao> result = new ArrayList<UserDao>();

            Iterator<UserDao> iterator = arr.iterator();

            while (iterator.hasNext()) {
                UserDao user = iterator.next();
                user.setPassword(null);
                result.add(user);
            }
            return result;
        }

        else{
            return new ArrayList<UserDao>();
        }
    }

    public User getUserById( Integer id){

        UserDao userDetails=repository.getById(id);

        User customer=new User();
        customer.setId(userDetails.getId());
        customer.setRole(userDetails.getRole());
        customer.setFirst_name(userDetails.getFirst_name());
        customer.setLast_name(userDetails.getLast_name());
        customer.setGender(userDetails.getGender());
        customer.setPassword(null);
        customer.setEmail(userDetails.getEmail());
        customer.setDate_of_birth(userDetails.getDate_of_birth());
        customer.setMobile_number(userDetails.getMobile_number());
        customer.setAddress(userDetails.getAddress());
        customer.setCity(userDetails.getCity());
        customer.setState(userDetails.getState());
        customer.setCountry(userDetails.getCountry());
        customer.setLogin_status(userDetails.getLogin_status());

        if(customer.getRole().contentEquals("patient")){

            PatientDao existingPaitent=patientRepo.getById(userDetails.getId());
            System.out.println(existingPaitent);

            customer.setBlood_type(existingPaitent.getBlood_type());
            customer.setHeight(existingPaitent.getHeight());
            customer.setWeight(existingPaitent.getWeight());
            customer.setInsurance_id(existingPaitent.getInsurance_id());
            customer.setEmergency_contact_name(existingPaitent.getEmergency_contact_name());
            customer.setEmergency_contact_number(existingPaitent.getEmergency_contact_number());
            customer.setUpdated_by(existingPaitent.getUpdated_by());
            customer.setCreated_by(existingPaitent.getCreated_by());
        }
        if(customer.getRole().contentEquals("doctor")){
            DoctorDao doctor=doctorRepo.getById(userDetails.getId());

            customer.setSpeciality(doctor.getSpeciality());


        }
        return customer;

    }

    public UserDao getUserByEmail(String email){
        UserDao user=repository.findByEmail(email);
        user.setPassword(null);
        return user;
    }

    public List<SignInHistoryDao> getSignInHistory(){
        return signInRepo.findAll();
    }

    public List<User> getPatients(){
        List<PatientDao> patientArray=patientRepo.findAll();
        System.out.println(patientArray.toString());

        List<User> finalResult=new ArrayList<User>();

        Iterator<PatientDao> itr=patientArray.iterator();

        while(itr.hasNext()) {

            PatientDao details=itr.next();
            UserDao patientDetails=repository.getById(details.getPatient_id());
            User result = new User();

            result.setId(details.getPatient_id());
            result.setRole(patientDetails.getRole());
            result.setFirst_name(patientDetails.getFirst_name());
            result.setLast_name(patientDetails.getLast_name());
            result.setGender(patientDetails.getGender());
            result.setDate_of_birth(patientDetails.getDate_of_birth());
            result.setMobile_number(patientDetails.getMobile_number());
            result.setEmail(patientDetails.getEmail());
            result.setAddress(patientDetails.getAddress());
            result.setCity(patientDetails.getCity());
            result.setState(patientDetails.getState());
            result.setCountry(patientDetails.getCountry());
            result.setLogin_status(patientDetails.getLogin_status());
            result.setBlood_type(details.getBlood_type());
            result.setHeight(details.getHeight());
            result.setWeight(details.getWeight());
            result.setInsurance_id(details.getInsurance_id());
            result.setEmergency_contact_name(details.getEmergency_contact_name());
            result.setEmergency_contact_number(details.getEmergency_contact_number());
            result.setCreated_by(details.getCreated_by());
            result.setUpdated_by(details.getUpdated_by());
            finalResult.add(result);
            System.out.println(result);
        }
        return finalResult;

    }

    public List<User> getDoctors(){
        List<DoctorDao> DoctorArray=doctorRepo.findAll();
        System.out.println(DoctorArray.toString());

        List<User> finalResult=new ArrayList<User>();

        Iterator<DoctorDao> itr=DoctorArray.iterator();

        while(itr.hasNext()) {

            DoctorDao details=itr.next();
            UserDao doctorDetials=repository.getById(details.getDoctor_id());
            User result = new User();

            result.setId(details.getDoctor_id());
            result.setRole(doctorDetials.getRole());
            result.setFirst_name(doctorDetials.getFirst_name());
            result.setLast_name(doctorDetials.getLast_name());
            result.setGender(doctorDetials.getGender());
            result.setDate_of_birth(doctorDetials.getDate_of_birth());
            result.setMobile_number(doctorDetials.getMobile_number());
            result.setEmail(doctorDetials.getEmail());
            result.setAddress(doctorDetials.getAddress());
            result.setCity(doctorDetials.getCity());
            result.setState(doctorDetials.getState());
            result.setCountry(doctorDetials.getCountry());
            result.setLogin_status(doctorDetials.getLogin_status());
            result.setSpeciality(details.getSpeciality());
            finalResult.add(result);
            System.out.println(result);
        }
        return finalResult;

    }



//    public Optional<User> getUserById(Integer id){
//        return repository.findById(id);
//    }
}
