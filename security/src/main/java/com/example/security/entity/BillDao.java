package com.example.security.entity;

import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="bill")
public class BillDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "transaction_id", nullable = false)
    private Integer transaction_id;

    @Column(name = "insurance_id")
    private Integer insurance_id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;


    @Column(name = "created_name", nullable = false)
    private String created_name;

    @Column(name = "created_time", nullable = false)
    private Timestamp created_time;

    @Column(name = "created_id", nullable = false)
    private Integer created_id;




}
