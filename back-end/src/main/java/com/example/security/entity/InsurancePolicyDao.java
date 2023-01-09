package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="insurance_policy")

public class InsurancePolicyDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name = "policy_name", nullable = false)
    private String policy_name;

    @Column(name = "company_name", nullable = false)
    private String company_name;

    @Column(name = "coverage_percentage", nullable = false)
    private Integer coverage_percentage;


    @Column(name = "group_number", nullable = false)
    private String group_number;

    @Column(name = "created_by", nullable = false)
    private String created_by;

    @Column(name = "created_name", nullable = false)
    private String created_name;




}
