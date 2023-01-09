package com.example.security.service;

import com.example.security.entity.DoctorDao;
import com.example.security.entity.PatientDao;
import com.example.security.entity.SignInHistoryDao;
import com.example.security.entity.UserDao;
import com.example.security.repository.DoctorRepository;
import com.example.security.repository.PatientRepository;
import com.example.security.repository.SignInHistoryRepository;
import com.example.security.repository.UserRepository;
import models.SignInHistory;
import models.User;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.sql.Timestamp;
import java.util.UUID;

@Service

public class CustomerUserDetailsService  {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private SignInHistoryRepository signInRepo;


    @Autowired
    private JavaMailSender mailSender;



    public UserDao loadUserByUsername(String username, String password) {

        UserDao user = userRepo.findByEmail(username);
        int strength = 10; // work factor of bcrypt
        System.out.println(user);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength,new SecureRandom() );


        if (user == null) {
            System.out.println("User not found");
        } else {
            if (bCryptPasswordEncoder.matches(password,user.getPassword())) {
                long timeDiff = new Date().getTime() - user.getLogin_time().getTime();
                timeDiff = (timeDiff / (1000*60*60)) %24;
                if(user.getAccount_verified() == false && user.getNo_of_attempts() >= 2){
                    user.setNo_of_attempts(user.getNo_of_attempts() + 1);
                    userRepo.save(user);
                    signIn(user,"login");
                    return user;
                }
                if (!user.getAccount_status().contentEquals("Blocked") || timeDiff >= 24) {
                    user.setAccount_status("UnBlocked");
                    user.setNo_of_attempts(0);
                    user.setLogin_status("logged_in");
                    user.setAccount_verified(true);
                    userRepo.save(user);
                    signIn(user,"login");
                    System.out.println(user);
                    user.setPassword(null);
                }
                return user;
            } else {
                user.setAccount_verified(false);
                user.setNo_of_attempts(user.getNo_of_attempts() +1);
                if(user.getNo_of_attempts() >=5){
                    user.setAccount_status("Blocked");
                    user.setLogin_time(new Timestamp((new Date()).getTime()));
                }
                userRepo.save(user);
                signIn(user,"login");
                user.setPassword(null);
                return user;
            }
        }
        return null;

    }
    public void signIn(UserDao u, String status){
        SignInHistoryDao userLog=new SignInHistoryDao();

        userLog.setLogin_status(u.getLogin_status());
        userLog.setLogin_id(u.getId());
        userLog.setTime(new Timestamp(System.currentTimeMillis()));
        userLog.setRole(u.getRole());
        if(u.getLogin_status().contentEquals("logged_in")){
            userLog.set_success(true);

        }
        else{
            userLog.set_success(false);

        }

        if(status.contentEquals("login")){
            userLog.setActivity("Log in");
        }
        else{
            userLog.setActivity("Log out");
        }
        userLog.setFirst_name(u.getFirst_name());
        userLog.setLast_name(u.getLast_name());
        userLog.setEmail(u.getEmail());
        signInRepo.save(userLog);



    }

    public String deleteUser(Integer id,String email){
        UserDao user=userRepo.getById(id);
        UserDao checkScope=userRepo.findByEmail(email);
        try {
            if(checkScope.getRole().contentEquals("admin")) {
                if (user.getRole().contentEquals("patient")) {
                    userRepo.deleteById(id);
                    patientRepo.deleteById(id);
                    return "success";
                } else if (user.getRole().contentEquals("doctor")) {
                    userRepo.deleteById(id);
                    doctorRepo.deleteById(id);
                    return "success";
                } else {
                    if(checkScope.getRole().contentEquals(user.getRole())) {
                        return "cannot delete user";
                    }
                    else{
                        userRepo.deleteById(id);
                    }
                    return "success";
                }
            }
            else{
                return "cannot delete user";
            }
        }
        catch(Exception e){
            return "something went wrong, please try again later.";
        }

    }
    public String updateUser(User userDetails) {

        UserDao customer = new UserDao();
        UserDao existing=userRepo.getById(userDetails.getId());

        if (userDetails != null) {

            customer.setId(userDetails.getId());
            customer.setRole(userDetails.getRole());
            customer.setFirst_name(userDetails.getFirst_name());
            customer.setLast_name(userDetails.getLast_name());
            customer.setGender(userDetails.getGender());
            customer.setPassword(existing.getPassword());
            customer.setEmail(userDetails.getEmail());
            customer.setDate_of_birth(userDetails.getDate_of_birth());
            customer.setMobile_number(userDetails.getMobile_number());
            customer.setAddress(userDetails.getAddress());
            customer.setCity(userDetails.getCity());
            customer.setState(userDetails.getState());
            customer.setCountry(userDetails.getCountry());
            customer.setLogin_status(existing.getLogin_status());
            customer.setAccount_status(existing.getAccount_status());
            customer.setAccount_verified(existing.getAccount_verified());
            customer.setNo_of_attempts(existing.getNo_of_attempts());
                try {
                    userRepo.save(customer);
                    if(userDetails.getRole().contentEquals("patient")){
                        PatientDao patient=new PatientDao();
                        PatientDao existingPaitent=patientRepo.getById(userDetails.getId());
                        patient.setPatient_id(customer.getId());
                        patient.setBlood_type(userDetails.getBlood_type());
                        patient.setHeight(userDetails.getHeight());
                        patient.setWeight(userDetails.getWeight());
                        patient.setInsurance_id(existingPaitent.getInsurance_id());
                        patient.setEmergency_contact_name(userDetails.getEmergency_contact_name());
                        patient.setEmergency_contact_number(userDetails.getEmergency_contact_number());
                        patient.setUpdated_by(userDetails.getUpdated_by());
                        patient.setCreated_by(userDetails.getCreated_by());
                        System.out.println(patient);
                        patientRepo.save(patient);
                    }
                    if(userDetails.getRole().contentEquals("doctor")){
                        DoctorDao doctor=new DoctorDao();
                        doctor.setDoctor_id(customer.getId());
                        doctor.setSpeciality(userDetails.getSpeciality());
                        doctorRepo.save(doctor);

                    }



                    return "success";
                } catch (Exception e) {
                    return e.toString();
                }

            }



        else{
            return "Enter Valid Details";
        }
    }


    public String registerCustomer(User userDetails, String email ) {

        UserDao checkScope = null;
        if(email.contentEquals("")){
            checkScope=null;

        }
        else{
            checkScope=userRepo.findByEmail(email);
        }
        UserDao customer = new UserDao();
        if (userDetails != null) {

            customer.setRole(userDetails.getRole());
            int strength = 10; // work factor of bcrypt
            BCryptPasswordEncoder bCryptPasswordEncoder =
                    new BCryptPasswordEncoder(strength, new SecureRandom());
            String encodedPassword = bCryptPasswordEncoder.encode(userDetails.getPassword());


            customer.setPassword(encodedPassword);
            customer.setFirst_name(userDetails.getFirst_name());
            customer.setLast_name(userDetails.getLast_name());
            customer.setGender(userDetails.getGender());
            customer.setDate_of_birth(userDetails.getDate_of_birth());
            customer.setMobile_number(userDetails.getMobile_number());
            customer.setEmail(userDetails.getEmail());
            customer.setAddress(userDetails.getAddress());
            customer.setCity(userDetails.getCity());
            customer.setState(userDetails.getState());
            customer.setCountry(userDetails.getCountry());
            customer.setLogin_status(userDetails.getLogin_status());
            customer.setAccount_status("Unblocked");
            customer.setNo_of_attempts(0);
            customer.setAccount_verified(true);

            if(userRepo.findByEmail(customer.getEmail())!=null){
                return "User already exists";
            }
            else{
                try {
                    if(checkScope!=null && checkScope.getRole().contentEquals("admin") && !userDetails.getRole().contentEquals("admin")){


                        userRepo.save(customer);
                        if (userDetails.getRole().contentEquals("patient")) {
                            PatientDao patient = new PatientDao();
                            patient.setPatient_id(customer.getId());
                            patient.setBlood_type(userDetails.getBlood_type());
                            patient.setHeight(userDetails.getHeight());
                            patient.setWeight(userDetails.getWeight());
                            patient.setInsurance_id(UUID.randomUUID().toString());
                            //patient.setInsurance_id(userDetails.getInsurance_id());
                            patient.setEmergency_contact_name(userDetails.getEmergency_contact_name());
                            patient.setEmergency_contact_number(userDetails.getEmergency_contact_number());
                            patient.setCreated_by(userDetails.getCreated_by());
                            patient.setUpdated_by(userDetails.getUpdated_by());
                            System.out.println(patient);
                            patientRepo.save(patient);
                        }
                        if (userDetails.getRole().contentEquals("doctor")) {
                            DoctorDao doctor = new DoctorDao();
                            doctor.setDoctor_id(customer.getId());
                            doctor.setSpeciality(userDetails.getSpeciality());
                            doctorRepo.save(doctor);

                        }

                    }
                    else if(checkScope!=null && checkScope.getRole().contentEquals("doctor")){
                        if (userDetails.getRole().contentEquals("patient")) {
                            userRepo.save(customer);
                            PatientDao patient = new PatientDao();
                            patient.setPatient_id(customer.getId());
                            patient.setBlood_type(userDetails.getBlood_type());
                            patient.setHeight(userDetails.getHeight());
                            patient.setWeight(userDetails.getWeight());
                            patient.setInsurance_id(UUID.randomUUID().toString());
                            //patient.setInsurance_id(userDetails.getInsurance_id());
                            patient.setEmergency_contact_name(userDetails.getEmergency_contact_name());
                            patient.setEmergency_contact_number(userDetails.getEmergency_contact_number());
                            patient.setCreated_by(userDetails.getCreated_by());
                            patient.setUpdated_by(userDetails.getUpdated_by());
                            System.out.println(patient);
                            patientRepo.save(patient);
                        }

                    }
                    else if(checkScope!=null && checkScope.getRole().contentEquals("hospital_staff")){
                        if (userDetails.getRole().contentEquals("patient")) {
                            userRepo.save(customer);
                            PatientDao patient = new PatientDao();
                            patient.setPatient_id(customer.getId());
                            patient.setBlood_type(userDetails.getBlood_type());
                            patient.setHeight(userDetails.getHeight());
                            patient.setWeight(userDetails.getWeight());
                            patient.setInsurance_id(UUID.randomUUID().toString());
                            //patient.setInsurance_id(userDetails.getInsurance_id());
                            patient.setEmergency_contact_name(userDetails.getEmergency_contact_name());
                            patient.setEmergency_contact_number(userDetails.getEmergency_contact_number());
                            patient.setCreated_by(userDetails.getCreated_by());
                            patient.setUpdated_by(userDetails.getUpdated_by());
                            System.out.println(patient);
                            patientRepo.save(patient);
                        }
                    }
                    else if(checkScope==null && userDetails.getRole().contentEquals("patient")){
                        userRepo.save(customer);
                        PatientDao patient = new PatientDao();
                        patient.setPatient_id(customer.getId());
                        patient.setBlood_type(userDetails.getBlood_type());
                        patient.setHeight(userDetails.getHeight());
                        patient.setWeight(userDetails.getWeight());
                        patient.setInsurance_id(UUID.randomUUID().toString());
                        //patient.setInsurance_id(userDetails.getInsurance_id());
                        patient.setEmergency_contact_name(userDetails.getEmergency_contact_name());
                        patient.setEmergency_contact_number(userDetails.getEmergency_contact_number());
                        patient.setCreated_by(userDetails.getCreated_by());
                        patient.setUpdated_by(userDetails.getUpdated_by());
                        System.out.println(patient);
                        patientRepo.save(patient);
                    }
                    else {
                        return "cannot create user";
                    }
                    return "success";
                } catch (Exception e) {
                    return e.toString();
                }

            }


        }
        else{
            return "Enter Valid Details";
        }
    }


    public String GenerateOtp(String email) throws MessagingException, UnsupportedEncodingException {
        System.out.println(email);
        UserDao user=userRepo.findByEmail(email.trim());
        String randomCode = RandomString.make(8);
        System.out.println(user.getEmail());
        user.setOne_time_password(randomCode);

        userRepo.save(user);
        String fromAddress = "gganshredy@gmail.com";
        String senderName = "Software Secuirty Project User Verification";
        String subject = "Please verify your registration";
        String content =  "<p>Hello " + user.getFirst_name() + "</p>"
                + "<p>For security reason, you're required to use the following "
                + "One Time Password to login:</p>"
                + "<p><b>" + user.getOne_time_password() + "</b></p>"
                + "<br>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(email);
        helper.setSubject(subject);

//        content = content.replace("[[name]]", user.getFullName());
//        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();
//
//        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        try {
            mailSender.send(message);
            return "success";
        }
        catch(Exception e) {
            System.out.println(e);
            return "something went wrong, please try again later.";
        }

    }
    public String logoutUser(User u){
        UserDao user=userRepo.getById(u.getId());

        user.setLogin_status("logged_out");
        signIn(user,"logout");

        return "success";

    }
    public String ValidateOtp(String email,String otp){
        UserDao user=userRepo.findByEmail(email);
        String result=user.getOne_time_password();
        if(result.contentEquals(otp)){
            user.setOne_time_password(null);
            user.setAccount_verified(true);
            userRepo.save(user);
            return "success";
        }
        else{
            return "failed";
        }

    }
}
