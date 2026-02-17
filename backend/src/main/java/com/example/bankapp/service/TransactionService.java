package com.example.bankapp.service;

import com.example.bankapp.dto.account.*;
import com.example.bankapp.dto.transaction.TransactionDto;
import com.example.bankapp.model.Account;
import com.example.bankapp.model.Transaction;
import com.example.bankapp.model.TransactionType;
import com.example.bankapp.repository.AccountRepository;
import com.example.bankapp.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService   {

    private  final AccountRepository accountRepository;
    private  final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountService accountService;

@Transactional
    public DepositResponse deposit(Account account, DepositRequest dto) {

        BigDecimal newBalance = account.getBalance().add(dto.getAmount());
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setType(TransactionType.DEPOSIT);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setAccount(account);
        transactionRepository.save(transaction);

        return DepositResponse.builder()
                .username(account.getUsername())
                .amount(dto.getAmount())
                .newBalance(newBalance)
                .timestamp(transaction.getTimestamp())
                .build();
    }

@Transactional
    public WithdrawResponse withdraw(Account account, DepositRequest dto) {
        BigDecimal amount = dto.getAmount();

        if(account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance!");
        }
        BigDecimal newBalance = account.getBalance().subtract(amount);
        account.setBalance(newBalance);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType(TransactionType.WITHDRAWAL);
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setAccount(account);
        transactionRepository.save(transaction);

        return WithdrawResponse.builder()
                .username(account.getUsername())
                .amount(amount)
                .newBalance(newBalance)
                .timestamp(transaction.getTimestamp())
                .build();
    }

@Transactional
    public TransferResponse transfer(TransferRequest dto) {
        Account sender = accountService.getLoggedInAccount();

        Account receiver = accountRepository.findByUsername(dto.getToUsername())
                .orElseThrow(() -> new RuntimeException("Receiver account not found!"));

        BigDecimal amount = dto.getAmount();

        if (sender.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance!");
        }

        sender.setBalance(sender.getBalance().subtract(amount));
        accountRepository.save(sender);

        receiver.setBalance(receiver.getBalance().add(amount));
        accountRepository.save(receiver);

        LocalDateTime timestamp = LocalDateTime.now();

        Transaction senderTransaction = new Transaction();
        senderTransaction.setAccount(sender);
        senderTransaction.setAmount(amount);
        senderTransaction.setType(TransactionType.TRANSFER);
        senderTransaction.setTimestamp(timestamp);
        transactionRepository.save(senderTransaction);

        Transaction receiverTransaction = new Transaction();
        receiverTransaction.setAccount(receiver);
        receiverTransaction.setAmount(amount);
        receiverTransaction.setType(TransactionType.DEPOSIT); // or RECEIVED if you prefer enum
        receiverTransaction.setTimestamp(timestamp);
        transactionRepository.save(receiverTransaction);

        return TransferResponse.builder()
                .fromUsername(sender.getUsername())
                .toUsername(receiver.getUsername())
                .amount(amount)
                .senderNewBalance(sender.getBalance())
                .timestamp(timestamp)
                .build();
    }




    public List<TransactionDto> getMyTransactions(Account account) {

        List<Transaction> transactions = transactionRepository.findByAccountId(account.getId());

        return transactions.stream()
                .map(tx -> TransactionDto.builder()
                        .type(tx.getType())
                        .amount(tx.getAmount())
                        .timestamp(tx.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }

}

