package com.bnroll.property.entity;

import com.bnroll.commercedomain.entity.BaseEntity;
import com.bnroll.commercedomain.enums.user.RoleName;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "property_member")
@Getter
@Setter
public class PropertyMember extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;


    @Column(nullable = false)
    private Long userId;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleName role;
}