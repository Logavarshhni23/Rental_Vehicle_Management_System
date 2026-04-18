package com.vehiclerental.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer seats;

    @Column(nullable = false)
    private String features;

    @Column(nullable = false)
    private String fuelType;

    private String model;

    private String color;

    @Column(nullable = false)
    private Double pricePerDay;

    @Column(nullable = false)
    private Boolean availability = true;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String image;

    private Double review;

    @Column(nullable = false)
    private String hostedBy;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
