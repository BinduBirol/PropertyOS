package com.bnroll.auth.client;

import com.bnroll.auth.security.JwtUtil;
import com.bnroll.auth.service.JwtService;
import com.bnroll.commercedomain.enums.ServiceName;
import com.bnroll.dto.property.FacilityDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class PropertyClient {

    private final RestClient propertyRestClient;

    private final JwtService jwtService;

    public FacilityDto createFacility(FacilityDto request) {
        String token = jwtService.generateServiceToken(ServiceName.AUTH_SERVICE.value());
        return propertyRestClient.post()
                .uri("/internal/facility/create")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .body(request)
                .retrieve()
                .body(FacilityDto.class);
    }
}