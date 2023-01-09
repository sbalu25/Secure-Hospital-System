package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="appointments")
public class AppointmentsDao {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "appointment_id", nullable = false)
    private Integer appointment_id;

    @Column(name="doctor_id")
    private Integer doctor_id;

    @Column(name="patient_id",nullable = false)
    private Integer patient_id;

    @Column(name="appointment_time",nullable = false)
    private Timestamp time;

    @Column(name="created_by",nullable = false)
    private String created_by;

    @Column(name="status",nullable = false)
    private String status;

    @Column(name="patient_name",nullable = false)
    private String patient_name;

    @Column(name="doctor_name")
    private String doctor_name;

    @Column(name="speciality")
    private String speciality;

    @Column(name="created_time")
    private Timestamp created_time;










}
