package com.example.authentication.product.dto;

import com.example.authentication.product.Product;

public record ProductResponse(
        Integer id,
        String name,
        String description,
        Double price,
        Integer userId
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getUserId()
        );
    }
}
