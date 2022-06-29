package com.example.security.repository;

import com.example.security.entity.UserDao;
import models.CustomerRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



public interface UserRepository extends JpaRepository<UserDao, Integer> {

//    Optional<UserDao> findById(Integer id);
    @Query(value = "Select * from users u where u.id=?1",nativeQuery = true)
    public UserDao getById(Integer id);

    @Query(value = "SELECT * FROM users u WHERE u.email = ?1",nativeQuery = true)
    public UserDao findByEmail(String email);



}
