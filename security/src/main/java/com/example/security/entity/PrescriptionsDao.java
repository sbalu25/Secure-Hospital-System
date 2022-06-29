package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="prescriptions")
public class PrescriptionsDao {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "prescription_id", nullable = false)
    private Integer prescription_id;

    @Column(name="doctor_id",nullable = true)
    private Integer doctor_id;

    @Column(name="patient_id",nullable = true)
    private Integer patient_id;

    @Column(name="timestamp",nullable = false)
    private Timestamp time;

    @Column(name="patient_name",nullable = false)
    private String patient_name;

    @Column(name="doctor_name",nullable = false)
    private String doctor_name;
}
