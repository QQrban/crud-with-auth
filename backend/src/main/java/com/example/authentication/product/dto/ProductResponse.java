package com.example.authentication.product.dto;

public record ProductResponse(
        String id,
        String name,
        String description,
        Double price,
        String userId
) {
}
