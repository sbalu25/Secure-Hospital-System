package com.example.security.repository;

import com.example.security.entity.PrescriptionsDao;
import com.example.security.entity.SignInHistoryDao;
import com.example.security.entity.TestsDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SignInHistoryRepository  extends JpaRepository<SignInHistoryDao, Integer> {

}
