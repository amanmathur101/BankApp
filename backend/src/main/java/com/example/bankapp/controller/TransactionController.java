package com.example.bankapp.controller;

import com.example.bankapp.dto.account.DepositRequest;
import com.example.bankapp.dto.account.DepositResponse;
import com.example.bankapp.dto.account.TransferRequest;
import com.example.bankapp.dto.account.TransferResponse;
import com.example.bankapp.dto.account.WithdrawResponse;
import com.example.bankapp.dto.transaction.TransactionDto;
import com.example.bankapp.model.Account;
import com.example.bankapp.service.AccountService;
import com.example.bankapp.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final AccountService accountService; // to get logged-in account

    @PostMapping("/deposit")
    public ResponseEntity<DepositResponse> deposit(@RequestBody DepositRequest dto) {
        Account account = accountService.getLoggedInAccount();
        DepositResponse response = transactionService.deposit(account, dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<WithdrawResponse> withdraw(@RequestBody DepositRequest dto) {
        Account account = accountService.getLoggedInAccount();
        WithdrawResponse response = transactionService.withdraw(account, dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransferResponse> transfer(@RequestBody TransferRequest dto) {
        TransferResponse response = transactionService.transfer(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getMyTransactions() {
        Account account = accountService.getLoggedInAccount();
        List<TransactionDto> transactions = transactionService.getMyTransactions(account);
        return ResponseEntity.ok(transactions);
    }
}
