package com.bnroll.property.entity.lease;


import com.bnroll.commercedomain.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
        name = "lease_info",
        indexes = {
                @Index(name = "idx_lease_property", columnList = "propertyId"),
                @Index(name = "idx_lease_unit", columnList = "unitId"),
                @Index(name = "idx_lease_active", columnList = "active")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaseInfo extends BaseEntity {

    @Column(nullable = false)
    private UUID propertyId;

    @Column(nullable = false)
    private UUID unitId;

    @Column(nullable = false, length = 150)
    private String tenantName;

    @Column(nullable = false, length = 20)
    private String tenantPhone;

    @Column(length = 150)
    private String tenantEmail;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monthlyRent;

    @Column(precision = 12, scale = 2)
    private BigDecimal securityDeposit;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(nullable = false)
    private Integer dueDay;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @Column(length = 500)
    private String notes;
}