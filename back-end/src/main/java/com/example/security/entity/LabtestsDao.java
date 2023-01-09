package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="labtests")
public class LabtestsDao {


    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "lab_id", nullable = false)
    private Integer lab_id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctor_id;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "approved_by")
    private String approved_by;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name="patient_name",nullable = false)
    private String patient_name;

    @Column(name="doctor_name",nullable = false)
    private String doctor_name;

}
