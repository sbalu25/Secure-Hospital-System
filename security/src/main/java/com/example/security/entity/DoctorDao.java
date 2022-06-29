package com.example.security.entity;


import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="doctor")
public class DoctorDao {

    @Id
    @Column(name = "doctor_id", nullable = false)
    private Integer doctor_id;

    @Column(name = "speciality", nullable = false)
    private String speciality;


}
