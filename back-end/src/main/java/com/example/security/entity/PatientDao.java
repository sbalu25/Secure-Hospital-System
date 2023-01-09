package com.example.security.entity;


import lombok.Data;
import org.hibernate.id.IncrementGenerator;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="patient")
public class PatientDao {
    @Id
    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Column(name = "blood_type", nullable = false)
    private String blood_type;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "weight", nullable = false)
    private Integer weight;



    @Column(name = "insurance_id", nullable = false)
    private String insurance_id;

    @Column(name = "emergency_contact_name", nullable = false)
    private String emergency_contact_name;

    @Column(name = "emergency_contact_number", nullable = false)
    private String emergency_contact_number;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "updated_by")
    private String updated_by;




}
