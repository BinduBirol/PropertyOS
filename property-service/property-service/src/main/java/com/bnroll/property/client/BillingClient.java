package com.bnroll.property.client;

import com.bnroll.commercedomain.enums.ServiceName;
import com.bnroll.commercedomain.enums.billing.Feature;
import com.bnroll.commercedomain.exception.PropertyException;
import com.bnroll.common.dto.response.ApiResponse;
import com.bnroll.dto.billing.EntitlementDto;
import com.bnroll.property.security.JwtService;
//import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class BillingClient {

    private final RestClient billingRestClient;
    private final JwtService jwtService;
    /*
    @CircuitBreaker(
            name = "billing-service",
            fallbackMethod = "checkFeatureFallback"
    )*/
    public EntitlementDto checkFeatureAccess(Feature feature, UUID workspaceId, Long userId) {

        String token = jwtService.generateServiceToken(ServiceName.PROPERTY_SERVICE.value());

        ApiResponse<EntitlementDto> response = billingRestClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/core/check/entitlements")
                        .queryParam("feature", feature)
                        .queryParamIfPresent("workspaceId", Optional.ofNullable(workspaceId))
                        .queryParamIfPresent("userId", Optional.ofNullable(userId))
                        .build())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<EntitlementDto>>() {
                });

        return response.getData();
    }

    private EntitlementDto checkFeatureFallback(
            Feature feature,
            UUID workspaceId,
            Long userId,
            Throwable ex) {

        System.err.println("billing-service Fallback called : "+ex.getMessage());

        throw new PropertyException(
                "error.billing.service.unavailable",
                HttpStatus.SERVICE_UNAVAILABLE
        );
    }


}