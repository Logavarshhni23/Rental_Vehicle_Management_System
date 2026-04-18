package com.vehiclerental.controller;

import com.vehiclerental.dto.AuthRequest;
import com.vehiclerental.dto.AuthResponse;
import com.vehiclerental.dto.RegisterRequest;
import com.vehiclerental.model.User;
import com.vehiclerental.repository.UserRepository;
import com.vehiclerental.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User already exists");
                return ResponseEntity.badRequest().body(error);
            }

            String role = "user";
            if ("admin@gmail.com".equals(request.getEmail()) && "1234".equals(request.getPassword())) {
                role = "admin";
            }

            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(role);

            User savedUser = userRepository.save(user);

            AuthResponse response = new AuthResponse();
            response.setMessage("User created successfully");
            response.setUser(savedUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail()).orElse(null);
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found");
                return ResponseEntity.badRequest().body(error);
            }

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid password");
                return ResponseEntity.badRequest().body(error);
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole());

            AuthResponse response = new AuthResponse();
            response.setMessage("User logged in successfully");
            response.setToken(token);
            response.setRole(user.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        try {
            String email = (String) request.getAttribute("userEmail");
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
