package com.example.security.repository;

import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.DrugsDao;
import com.example.security.entity.PrescriptionsDao;
import models.Drugs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DrugsRepository  extends JpaRepository<DrugsDao, Integer> {

    @Query(value = "SELECT * FROM drugs d WHERE d.prescription_id = ?1",nativeQuery = true)
    public List<DrugsDao> findByPrescriptionId(Integer id);
}
