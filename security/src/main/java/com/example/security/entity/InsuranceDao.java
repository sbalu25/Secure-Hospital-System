package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="insurance")
public class InsuranceDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "insurance_id", nullable = false)
    private String insurance_id;

    @Column(name = "policy_name", nullable = false)
    private String policy_name;

    @Column(name = "patient_name", nullable = false)
    private String patient_name;


    @Column(name = "date_of_birth", nullable = false)
    private String date_of_birth;

    @Column(name = "group_number", nullable = false)
    private String group_number;

    @Column(name = "insurance_company", nullable = false)
    private String insurance_company;

    @Column(name = "created_by", nullable = false)
    private String created_by;

    @Column(name = "created_time", nullable = false)
    private Timestamp created_time;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;








}
