package com.example.authentication.product;


import com.example.authentication.exception.GlobalExceptionHandler;
import com.example.authentication.product.dto.ProductRequest;
import com.example.authentication.product.dto.ProductResponse;
import com.example.authentication.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse product(ProductRequest request, User userDetails) {
        log.info("Received product request: {}", request);
        log.info("Authenticated user: {}", userDetails);

        if (request.name().isEmpty() || request.description().isEmpty() || request.price() <= 0) {
            throw new IllegalArgumentException("Invalid product data: name, description, or price is invalid");
        }

        var product = Product.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .userId(userDetails.getId())
                .build();

        productRepository.save(product);

        return null;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponse::from)
                .toList();

    }
}
