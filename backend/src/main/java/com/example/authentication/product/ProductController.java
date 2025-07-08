package com.example.authentication.product;


import com.example.authentication.product.dto.ProductRequest;
import com.example.authentication.product.dto.ProductResponse;
import com.example.authentication.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    @PostMapping("/add-product")
    public ResponseEntity<ProductResponse> createProduct(
            @RequestBody ProductRequest request,
            @AuthenticationPrincipal User userDetails
    ) {
        return ResponseEntity.ok(productService.product(request, userDetails));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Integer id,
            @RequestBody ProductRequest request,
            @AuthenticationPrincipal User userDetails
    ) {
        return ResponseEntity.ok(productService.updateProduct(id, request, userDetails));
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestBody List<Integer> ids){
        productService.deleteProduct(ids);
    }
}
