package com.example.security.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;


@Data
@Entity
@Table(name="help_table")
public class HelpTableDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "patient_name", nullable = false)
    private String patient_name;

    @Column(name = "patient_mail", nullable = false)
    private String patient_mail;

    @Column(name = "request", nullable = false)
    private String request;

    @Column(name = "addressed_by")
    private String addressed_by;

    @Column(name = "addressed_name")
    private String addressed_name;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_time", nullable = false)
    private Timestamp created_time;

    @Column(name = "updated_time")
    private Timestamp updated_time;
}
