package com.example.bankapp.dto.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransferResponse {
    private String fromUsername;
    private String toUsername;
    private BigDecimal amount;
    private BigDecimal senderNewBalance;
    private LocalDateTime timestamp;
}
