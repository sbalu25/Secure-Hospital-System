package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="insurance_claim")
public class InsuranceClaimDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "policy_id", nullable = false)
    private String policy_id;

    @Column(name = "policy_name", nullable = false)
    private String policy_name;

    @Column(name = "transaction_id", nullable = false)
    private String transaction_id;

    @Column(name = "patient_name", nullable = false)
    private String patient_name;

    @Column(name = "patient_email", nullable = false)
    private String patient_email;

    @Column(name = "amount_claimed")
    private Integer amount_claimed;

    @Column(name = "group_number", nullable = false)
    private String group_number;



    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_time", nullable = false)
    private Timestamp created_time;

    @Column(name = "created_by", nullable = false)
    private String created_by;

    @Column(name = "updated_time")
    private Timestamp updated_time;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "comments")
    private String comments;







}
