package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="transactions")
public class TransactionsDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "transaction_id", nullable = false)
    private String transaction_id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "patient_name", nullable = false)
    private String patient_name;

    @Column(name = "transaction_type", nullable = false)
    private String transaction_type;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "time", nullable = false)
    private Timestamp time;

    @Column(name = "notes", nullable = false)
    private String notes;

    @Column(name = "created_by", nullable = false)
    private String created_by;

    @Column(name = "approved_by")
    private String approved_by;

    @Column(name = "approved_by_id")
    private Integer approved_by_id;








}
