package com.bnroll.common.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Standard API response")
public class ApiResponse<T> {

    @Schema(
            description = "Indicates whether the request was successful",
            example = "true"
    )
    private boolean success;

    @Schema(description = "Response payload")
    private T data;

    @Schema(description = "Error information if the request failed")
    private ApiError error;

    @Schema(description = "Additional response metadata")
    private Meta meta;

    @Schema(
            description = "Response timestamp",
            example = "2026-07-08T10:15:30"
    )
    private LocalDateTime timestamp;

    @Schema(
            description = "Request path",
            example = "/auth/v1/login"
    )
    private String path;

    @Schema(
            description = "Unique request identifier",
            example = "2c9ef0f2-2b2e-4b0f-bd93-7d61a1d17f35"
    )
    private String correlationId;

    @Schema(
            description = "API version",
            example = "v1"
    )
    private String version;
}