package com.example.bankapp.dto.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DepositResponse {
    private String username;
    private BigDecimal amount;
    private BigDecimal newBalance;
    private LocalDateTime timestamp;
}
