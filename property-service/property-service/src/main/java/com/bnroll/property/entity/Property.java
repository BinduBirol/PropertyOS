package com.bnroll.property.entity;

import com.bnroll.commercedomain.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "property")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property extends BaseEntity {


    @Column(nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PropertyType type;

    @Column(nullable = false, length = 255)
    private String addressLine1;

    @Column(length = 255)
    private String addressLine2;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Column(length = 20)
    private String postalCode;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
}