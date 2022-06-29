package com.example.security.entity;

import lombok.Data;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.GenerationType.AUTO;

@Data
@Entity
@Table(name="blockchain")
public class BlockChainDao {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "entity_id", nullable = false)
    private Integer entity_id;

    @Column(name = "hashcode", nullable = false)
    private String hashcode;

    @Column(name = "entity", nullable = false)
    private String entity;


    @Column(name = "time", nullable = false)
    private Timestamp time;







}
