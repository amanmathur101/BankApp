package com.example.bankapp.service;

import com.example.bankapp.dto.account.*;
import com.example.bankapp.model.Account;
import com.example.bankapp.repository.AccountRepository;
import com.example.bankapp.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class AccountService   {

    private  final AccountRepository accountRepository;
    private  final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountDto getMyDetails() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("username"+"  "+username);
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AccountDto.builder()
                .username(account.getUsername())
                .balance(account.getBalance())
                .role(account.getRole())
                .build();
    }

    public Account getLoggedInAccount() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Logged in account not found"));
    }

    public Account findAccountByUsername(String username) {
        return accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found with username: " + username));
    }

}

