package com.bnroll.property.entity.unit;


import com.bnroll.commercedomain.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(
        name = "facility_units",
        indexes = {
                @Index(name = "idx_unit_facility", columnList = "facilityId"),
                @Index(name = "idx_unit_floor", columnList = "floorId"),
                @Index(name = "idx_unit_facility_number", columnList = "facilityId,number", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Unit extends BaseEntity {

    @Column(nullable = false)
    private UUID facilityId;

    @Column(nullable = false)
    private UUID floorId;

    @Column(nullable = false, length = 30)
    private String number;

    @Column(length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private UnitType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private UnitStatus status = UnitStatus.VACANT;

    @Column(precision = 10, scale = 2)
    private BigDecimal area;

    private Integer bedrooms;

    private Integer bathrooms;

    @Column(length = 500)
    private String description;
}