package com.vehiclerental.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateBookingRequest {
    private Long vehicleId;
    private LocalDateTime pickupDate;
    private LocalDateTime dropDate;
}
