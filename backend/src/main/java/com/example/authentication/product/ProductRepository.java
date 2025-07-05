package com.example.authentication.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    Optional<Product> findByname(String name);

    Optional<Product> findByid(Integer id);

    List<Product> findByuserId(Integer userId);

    List<Product> findAllBy();

}
