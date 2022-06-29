package com.example.security.repository;

import com.example.security.entity.AppointmentsDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.entity.TransactionsDao;
import com.example.security.entity.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<AppointmentsDao, Integer> {

    @Query(value = "SELECT * FROM appointments a WHERE a.appointment_id = ?1",nativeQuery = true)
    public AppointmentsDao findByAppointmentId(Integer id);

    @Query(value = "SELECT * FROM appointments a WHERE a.patient_id = ?1",nativeQuery = true)
    public List<AppointmentsDao> findByPatientId(Integer id);

    @Query(value = "SELECT * FROM appointments a WHERE a.doctor_id = ?1",nativeQuery = true)
    public List<AppointmentsDao> findByDoctorId(Integer id);

}
