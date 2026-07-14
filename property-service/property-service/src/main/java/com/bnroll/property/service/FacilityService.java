package com.bnroll.property.service;

import com.bnroll.property.dto.FacilityRequest;
import com.bnroll.property.entity.Facility;
import com.bnroll.property.entity.FacilityMember;
import com.bnroll.property.repository.FacilityMemberRepository;
import com.bnroll.property.repository.FacilityRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacilityService {
    private final FacilityRepository facilityRepository;
    private final FacilityMemberRepository facilityMemberRepository;

    public List<FacilityRequest> findAllByUserId(Long userId) {
        List<Facility> facilities = facilityMemberRepository.findFacilitiesByUserId(userId);

        return facilities.stream()
                .map(facility -> FacilityRequest.builder()
                        .name(facility.getName())
                        .type(facility.getType())
                        .addressLine1(facility.getAddressLine1())
                        .addressLine2(facility.getAddressLine2())
                        .city(facility.getCity())
                        .country(facility.getCountry())
                        .postalCode(facility.getPostalCode())
                        .description(facility.getDescription())
                        .build())
                .toList();
    }

    public Facility create(@Valid FacilityRequest request) {


        Facility facility = Facility.builder()
                .name(request.getName())
                .type(request.getType())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .country(request.getCountry())
                .postalCode(request.getPostalCode())
                .description(request.getDescription())
                .build();


        return facilityRepository.save(facility);
    }
}
