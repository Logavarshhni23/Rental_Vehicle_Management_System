package com.vehiclerental.dto;

import com.vehiclerental.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String token;
    private String role;
    private User user;
}
