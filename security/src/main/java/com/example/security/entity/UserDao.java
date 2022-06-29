package com.example.security.entity;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="USERS")
public class UserDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "Id", nullable = false)
    private Integer Id;

    @Column(name="role")
    private String role;

    @Column(name="password")
    private String password;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="gender")
    private String gender;

    @Column(name="date_of_birth")
    private String date_of_birth;

    @Column(name="mobile_number")
    private String mobile_number;

    @Column(nullable=false, unique=true,name="email")
    private String email;

    @Column(name="address")
    private String address;

    @Column(name="city")
    private String city;

    @Column(name="state")
    private String state;

    @Column(name="country")
    private String country;

    @Column(name="login_status")
    private String login_status;

    @Column(name = "one_time_password")
    private String one_time_password;

    @Column(name = "account_status")
    private String account_status;

    @Column(name = "login_time")
    private Timestamp login_time;

    @Column(name = "no_of_attempts")
    private Integer no_of_attempts;

    @Column(name = "account_verified")
    private Boolean account_verified;





}
