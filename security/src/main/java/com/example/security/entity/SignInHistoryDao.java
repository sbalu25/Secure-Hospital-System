package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;


@Data
@Entity
@Table(name="signinhistory")
public class SignInHistoryDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "login_status", nullable = false)
    private String login_status;

    @Column(name = "login_id", nullable = false)
    private Integer login_id;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "is_success", nullable = false)
    private boolean is_success;

    @Column(name = "first_name", nullable = false)
    private String first_name;

    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "activity", nullable = false)
    private String activity;
}
