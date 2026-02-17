package com.example.bankapp.dto.transaction;

import com.example.bankapp.model.TransactionType;
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
public class TransactionDto {
    private TransactionType type;
    private BigDecimal amount;
    private LocalDateTime timestamp;
}
