package com.example.security.entity;

import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="drugs")
public class DrugsDao {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "drugs_id", nullable = false)
    private Integer drugs_id;

    @Column(name = "prescription_id", nullable = false)
    private Integer prescription_id;

    @Column(name = "drug_name", nullable = false)
    private String drug_name;

    @Column(name = "dosage", nullable = false)
    private String dosage;

    @Column(name = "frequency", nullable = false)
    private String frequency;

    @Column(name = "units", nullable = false)
    private Integer units;

}
