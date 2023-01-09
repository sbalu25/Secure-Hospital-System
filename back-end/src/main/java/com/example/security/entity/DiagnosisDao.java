package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="diagnosis")
public class DiagnosisDao {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "diagnosis_id", nullable = false)
    private Integer diagnosis_id;

    @Column(name = "doctor_id", nullable = false)
    private Integer doctor_id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "symptoms", nullable = false)
    private String symptoms;

    @Column(name = "previous_medications", nullable = false)
    private String previous_medications;

    @Column(name = "drug_history", nullable = false)
    private String drug_history;

    @Column(name = "notes", nullable = false)
    private String notes;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name="patient_name",nullable = false)
    private String patient_name;

    @Column(name="doctor_name",nullable = false)
    private String doctor_name;


}
