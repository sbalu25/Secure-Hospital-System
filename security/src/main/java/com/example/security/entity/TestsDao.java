package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="tests")
public class TestsDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "test_id", nullable = false)
    private Integer test_id;

    @Column(name = "lab_id", nullable = false)
    private Integer lab_id;

    @Column(name = "test_name", nullable = false)
    private String test_name;

    @Column(name = "sample_type", nullable = false)
    private String sample_type;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "result",nullable = true)
    private String result;

    @Column(name = "time", nullable = false)
    private Timestamp time;











}
