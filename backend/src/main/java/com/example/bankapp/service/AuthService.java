package com.example.bankapp.service;

import com.example.bankapp.dto.auth.LoginRequest;
import com.example.bankapp.dto.auth.RegisterRequest;
import com.example.bankapp.jwt.JwtUtil;
import com.example.bankapp.model.Account;
import com.example.bankapp.model.Role;
import com.example.bankapp.repository.AccountRepository;
import com.example.bankapp.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AuthService {
    private  final AccountRepository accountRepository;
    private  final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest dto){
        if (accountRepository.findByUsername(dto.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }
        Account account = new Account();
        account.setUsername(dto.getUsername());
        account.setPassword(passwordEncoder.encode(dto.getPassword()));
        account.setRole(Role.USER);
        account.setBalance(BigDecimal.ZERO);

        accountRepository.save(account);

    }
    public Account login(LoginRequest dto) {
        Account account = accountRepository.findByUsername(dto.getUsername())
                .orElseThrow(()-> new RuntimeException("Invalid usernameor password"));
        if(!passwordEncoder.matches(dto.getPassword(),account.getPassword())){
            throw new RuntimeException("Invalid username or  password");
        }

        return account;
    }
}