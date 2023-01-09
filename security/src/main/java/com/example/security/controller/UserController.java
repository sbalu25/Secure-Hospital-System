package com.example.security.controller;

import com.example.security.config.JwtTokenUtil;
import com.example.security.entity.SignInHistoryDao;
import com.example.security.entity.UserDao;
import com.example.security.service.AppointmentService;
import com.example.security.service.CustomerUserDetailsService;
import com.example.security.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://hospital-system-10191.web.app/", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("user")
public class UserController {
//    @Value("${recaptcha.secret}")
//    private String captchaSecret;
//    @Value("${recaptcha-api}")
//    private String captchaApi;
    @Autowired
    private UserService userService;
    @Autowired
    private CustomerUserDetailsService customerService;

    @Autowired
    private AppointmentService apptService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;



    @PostMapping("/login")
    public ResponseEntity<?> getLogin(@RequestBody CustomerUserDetails loginDetails){
        HttpHeaders responseHeaders = new HttpHeaders();
        System.out.println(loginDetails.getUserName());
        final UserDao userDetails = customerService.loadUserByUsername(loginDetails.getUserName(),loginDetails.getPassword()    );
        if(userDetails!=null){
            if(userDetails.getLogin_status() == "logged_in"){
                final String token = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token, userDetails));
            }else if(userDetails.getAccount_status().contentEquals("Blocked")){
                return new ResponseEntity<String>("Account blocked", responseHeaders, HttpStatus.BAD_REQUEST);
            }else if(userDetails.getNo_of_attempts() >= 3 && userDetails.getAccount_verified() == false){
                return new ResponseEntity<String>("Verify Account", responseHeaders, HttpStatus.BAD_REQUEST);
            }else if(userDetails.getNo_of_attempts()>=3){
                return new ResponseEntity<String>("Block Warning", responseHeaders, HttpStatus.BAD_REQUEST);
            }else{
                return new ResponseEntity<String>("Incorrect Password", responseHeaders, HttpStatus.BAD_REQUEST);
            }
        }else{
            return new ResponseEntity<String>("Invalid Credentials", responseHeaders, HttpStatus.BAD_REQUEST);
        }

//        return ResponseEntity.;
//        return customerService.loadUserByUsername(loginDetails.getUserName(),loginDetails.getPassword());
    }

    @GetMapping("/verify")
    public String verify(@RequestParam String token){
        String params = "?secret=6Ld-PjofAAAAAO3_siYkcpwsC8Ldk5HKnQib6KTT"+"&response="+ token;
        RestTemplate restTemplate = new RestTemplate();
        RecaptchaResponse recaptchaResponse = restTemplate.exchange("https://www.google.com/recaptcha/api/siteverify"+params, HttpMethod.POST,null,RecaptchaResponse.class).getBody();
        System.out.println(recaptchaResponse.getChallenge_ts());
        if(recaptchaResponse.isSuccess()){
            return "success";
        }else{
            return "Please verify captcha";
        }
    }



    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user, @RequestHeader(value="Authorization", required=false) String Authorization) {
        System.out.println(Authorization);
        if(Authorization==null){
            if(user.getRole().contentEquals("patient")) {
                String result = customerService.registerCustomer(user, "");
                if (result.contentEquals("success")) {
                    return new ResponseEntity<String>(result, HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
                }
            }
            else{

                return new ResponseEntity<String>( "error cannot create user", HttpStatus.BAD_REQUEST);
            }
        }
        else{
            String jwtToken = Authorization.substring(7);
            String email = "";
            try {
                email = jwtTokenUtil.getEmailFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
            String result=customerService.registerCustomer(user, email);
            if(result.contentEquals("success")){
                return new ResponseEntity<String>(result, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
            }
        }

    }

    @GetMapping("/generateOtp")
    public String GenerateOtp(@RequestParam String email) throws MessagingException, UnsupportedEncodingException {
        return customerService.GenerateOtp(email);

    }

    @GetMapping("/validateOtp")
    public String ValidateOtp(@RequestParam String email,@RequestParam String otp) throws MessagingException, UnsupportedEncodingException {
        return customerService.ValidateOtp(email,otp);

    }
    @PostMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        String result=customerService.updateUser(user);
        if(result.contentEquals("success")){
            return new ResponseEntity<String>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestBody User user){
        String result=customerService.logoutUser(user);
        if(result.contentEquals("success")){
            return new ResponseEntity<String>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/delete")
    public String deleteUser(@RequestParam String id, @RequestHeader("Authorization") String token) {


        String jwtToken = token.substring(7);
        String email = "";
        try {
            email = jwtTokenUtil.getEmailFromToken(jwtToken);
        } catch (IllegalArgumentException e) {
            System.out.println("Unable to get JWT Token");
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token has expired");
        }
        return customerService.deleteUser(Integer.parseInt(id),email);

    }


    @GetMapping("/users")
    public List<UserDao> getUsers(@RequestHeader("Authorization") String token) {

        String jwtToken = token.substring(7);
        String email = "";
        try {
            email = jwtTokenUtil.getEmailFromToken(jwtToken);
        } catch (IllegalArgumentException e) {
            System.out.println("Unable to get JWT Token");
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token has expired");
        }

        return userService.getUsers(email);
    }

    @GetMapping("/getByName/{email}")
    public UserDao getByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/getById")
    @ResponseBody
    public User getById(@RequestParam String id){
        return userService.getUserById(Integer.parseInt(id));
    }

    @GetMapping("/patients")
    public List<User> getPatients() {
        return userService.getPatients();
    }

    @GetMapping("/doctors")
    public List<User> getDoctors() {
        return userService.getDoctors();
    }

    @GetMapping("/signInHistory")
    public List<SignInHistoryDao> getSignInHistory() {
        return userService.getSignInHistory();
    }


}
