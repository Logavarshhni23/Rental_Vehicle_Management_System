package com.vehiclerental.controller;

import com.vehiclerental.model.User;
import com.vehiclerental.model.Vehicle;
import com.vehiclerental.repository.UserRepository;
import com.vehiclerental.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    private boolean isAdmin(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) return false;
        User user = userRepository.findByEmail(email).orElse(null);
        return user != null && "admin".equals(user.getRole());
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if (vehicle == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Vehicle not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        return ResponseEntity.ok(vehicle);
    }

    @PostMapping
    public ResponseEntity<?> addVehicle(@RequestBody Vehicle vehicle, HttpServletRequest request) {
        try {
            if (!isAdmin(request)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            if (vehicleRepository.existsByName(vehicle.getName())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Vehicle already exists");
                return ResponseEntity.badRequest().body(error);
            }

            Vehicle savedVehicle = vehicleRepository.save(vehicle);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle added successfully");
            response.put("vehicle", savedVehicle);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedData, HttpServletRequest request) {
        try {
            if (!isAdmin(request)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
            if (vehicle == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Vehicle not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            // Update fields
            if (updatedData.getName() != null) vehicle.setName(updatedData.getName());
            if (updatedData.getType() != null) vehicle.setType(updatedData.getType());
            if (updatedData.getSeats() != null) vehicle.setSeats(updatedData.getSeats());
            if (updatedData.getFeatures() != null) vehicle.setFeatures(updatedData.getFeatures());
            if (updatedData.getFuelType() != null) vehicle.setFuelType(updatedData.getFuelType());
            if (updatedData.getModel() != null) vehicle.setModel(updatedData.getModel());
            if (updatedData.getColor() != null) vehicle.setColor(updatedData.getColor());
            if (updatedData.getPricePerDay() != null) vehicle.setPricePerDay(updatedData.getPricePerDay());
            if (updatedData.getAvailability() != null) vehicle.setAvailability(updatedData.getAvailability());
            if (updatedData.getImage() != null) vehicle.setImage(updatedData.getImage());
            if (updatedData.getReview() != null) vehicle.setReview(updatedData.getReview());
            if (updatedData.getHostedBy() != null) vehicle.setHostedBy(updatedData.getHostedBy());

            Vehicle savedVehicle = vehicleRepository.save(vehicle);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Vehicle updated");
            response.put("vehicle", savedVehicle);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id, HttpServletRequest request) {
        try {
            if (!isAdmin(request)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            if (!vehicleRepository.existsById(id)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Vehicle not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }

            vehicleRepository.deleteById(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Vehicle deleted successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
