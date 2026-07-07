package com.bnroll.common.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "API error details")
public class ApiError {

    @Schema(
            description = "Application-specific error code",
            example = "user.not.found"
    )
    private String code;

    @Schema(
            description = "Localized error message",
            example = "User not found."
    )
    private String message;

    @Schema(
            description = "HTTP status code",
            example = "404"
    )
    private int status;

    @Schema(
            description = "Validation errors keyed by field name",
            example = "{\"email\":\"Email is required.\",\"password\":\"Password is required.\"}"
    )
    private Map<String, String> fieldErrors;

    @Schema(
            description = "Name of the microservice that generated the error",
            example = "commerce-auth-service"
    )
    private String service;
}