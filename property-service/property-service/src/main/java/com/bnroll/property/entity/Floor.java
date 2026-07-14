package com.bnroll.property.entity;

import com.bnroll.commercedomain.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "facility_floors",
        indexes = {
                @Index(name = "idx_floor_property", columnList = "facilityId"),
                @Index(name = "idx_floor_property_number", columnList = "facilityId,floorNumber", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Floor extends BaseEntity {

    @Column(nullable = false)
    private UUID facilityId;

    @Column(nullable = false)
    private Integer floorNumber;

    @Column(nullable = false, length = 100)
    private String name;
}