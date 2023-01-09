package com.example.security.repository;

import com.example.security.entity.DrugsDao;
import com.example.security.entity.PrescriptionsDao;
import com.example.security.entity.TestsDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestsRepository extends JpaRepository<TestsDao, Integer> {

    @Query(value = "SELECT * FROM tests t WHERE t.lab_id = ?1",nativeQuery = true)
    public List<TestsDao> findByLabId(Integer id);
}
