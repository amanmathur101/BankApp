package com.example.bankapp.controller;

import com.example.bankapp.dto.auth.LoginRequest;
import com.example.bankapp.dto.auth.LoginResponse;
import com.example.bankapp.dto.auth.RegisterRequest;
import com.example.bankapp.jwt.JwtUtil;
import com.example.bankapp.model.Account;
import com.example.bankapp.model.Role;
import com.example.bankapp.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest dto) {
        authService.register(dto);
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest dto) {
        Account account = authService.login(dto);

        String role = account.getRole() != null ? account.getRole().name() : Role.USER.name();

        String token = jwtUtil.generateToken(account.getUsername(), role);

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("None")
                .build();

        LoginResponse response = new LoginResponse(account.getUsername(), "Login successful");

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
}
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out");
    }

}
