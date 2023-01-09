package com.example.security;

import com.example.security.controller.UserController;
import com.example.security.entity.UserDao;
import com.example.security.service.CustomerUserDetailsService;
import com.example.security.service.UserService;
import models.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;

import static org.junit.jupiter.api.AssertEquals.assertEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

@WebMvcTest(value= UserController.class)
public class UserControllerTest {
    @Autowired
    MockMvc mockmvc;
    @MockBean
    UserService userService;
    @MockBean
    CustomerUserDetailsService customerService;
    User user;

    @Test
    public void getByEmail(String email) throws Exception{
        user.setEmail("sandhya.balu525@gmail.com");
        user.setAddress("1215 E Vista Del Cerro Dr");
        user.setLogin_status("false");
        user.setRole("patient");
        user.setCity("tempe");
        user.setCountry("United States");
        user.setNo_of_attempts(0);
        user.setLogin_time(new Timestamp(System.currentTimeMillis()));
        user.setDate_of_birth("03/01/2022");
        user.setPassword("123456");
        user.setFirst_name("Sandhya");
        user.setLast_name("Balu");
        user.setGender("female");
        user.setMobile_number("9573689283");
        user.setAccount_status("Active");
        Mockito.when(customerService.registerCustomer(Mockito.any(User.class),Mockito.anyString())).thenReturn("success");
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/users/register").accept(MediaType.APPLICATION_JSON).content("success").contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockmvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.CREATED.value(),response.getStatus());


    }


}
