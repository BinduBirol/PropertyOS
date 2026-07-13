package com.bnroll.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Refresh token request")
public class RefreshTokenRequest {

    @NotBlank(message = "{validation.refresh.token.required}")
    @Schema(
            description = "JWT refresh token",
            example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    )
    private String refreshToken;

    @Schema(
            description = "Role to log in as.",
            allowableValues = {
                    "SUPER_ADMIN",
                    "OWNER",
                    "PROPERTY_MANAGER",
                    "ACCOUNTANT",
                    "SECURITY_GUARD",
                    "MAINTENANCE_STAFF",
                    "TENANT"
            },
            example = "OWNER"
    )
    @NotBlank(message = "{role.required}")
    private String role;
}