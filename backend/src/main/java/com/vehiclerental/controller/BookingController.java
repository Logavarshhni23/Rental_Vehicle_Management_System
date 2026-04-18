package com.vehiclerental.controller;

import com.vehiclerental.dto.CreateBookingRequest;
import com.vehiclerental.model.Booking;
import com.vehiclerental.model.User;
import com.vehiclerental.model.Vehicle;
import com.vehiclerental.repository.BookingRepository;
import com.vehiclerental.repository.UserRepository;
import com.vehiclerental.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) return null;
        return userRepository.findByEmail(email).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody CreateBookingRequest request, HttpServletRequest httpRequest) {
        try {
            if (request.getVehicleId() == null || request.getPickupDate() == null || request.getDropDate() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "All fields are required");
                return ResponseEntity.badRequest().body(error);
            }

            if (!request.getPickupDate().isBefore(request.getDropDate())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Drop date must be after pickup date");
                return ResponseEntity.badRequest().body(error);
            }

            Vehicle vehicle = vehicleRepository.findById(request.getVehicleId()).orElse(null);
            if (vehicle == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Vehicle not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            long totalDays = Duration.between(request.getPickupDate(), request.getDropDate()).toDays();
            if (Duration.between(request.getPickupDate(), request.getDropDate()).toHours() % 24 != 0) {
                totalDays++; // round up partial days
            }
            if (totalDays == 0) totalDays = 1;

            double totalAmount = totalDays * vehicle.getPricePerDay();

            User user = getAuthenticatedUser(httpRequest);
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setVehicle(vehicle);
            booking.setPickupDate(request.getPickupDate());
            booking.setDropDate(request.getDropDate());
            booking.setTotalAmount(totalAmount);
            booking.setStatus("pending");

            Booking savedBooking = bookingRepository.save(booking);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Booking created successfully");
            response.put("booking", savedBooking);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(HttpServletRequest request) {
        try {
            User user = getAuthenticatedUser(request);
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings(HttpServletRequest request) {
        try {
            User user = getAuthenticatedUser(request);
            if (user == null || !"admin".equals(user.getRole())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            List<Booking> bookings = bookingRepository.findAllByOrderByCreatedAtDesc();
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> payload, HttpServletRequest request) {
        try {
            User user = getAuthenticatedUser(request);
            if (user == null || !"admin".equals(user.getRole())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            String status = payload.get("status");
            if (!List.of("pending", "confirmed", "cancelled", "completed").contains(status)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid status");
                return ResponseEntity.badRequest().body(error);
            }

            Booking booking = bookingRepository.findById(id).orElse(null);
            if (booking == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Booking not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            booking.setStatus(status);
            bookingRepository.save(booking);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Booking status updated");
            response.put("booking", booking);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, HttpServletRequest request) {
        try {
            User user = getAuthenticatedUser(request);
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Booking booking = bookingRepository.findByIdAndUserId(id, user.getId()).orElse(null);
            if (booking == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Booking not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            if (!"pending".equals(booking.getStatus())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Only pending bookings can be cancelled");
                return ResponseEntity.badRequest().body(error);
            }

            booking.setStatus("cancelled");
            bookingRepository.save(booking);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Booking cancelled successfully");
            response.put("booking", booking);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
