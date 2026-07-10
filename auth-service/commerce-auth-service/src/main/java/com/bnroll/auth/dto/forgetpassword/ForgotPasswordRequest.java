package com.bnroll.auth.dto.forgetpassword;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForgotPasswordRequest {

    @NotBlank(message = "{validation.identifier.required}")
    @Schema(
            description = "Email address or mobile number",
            example = "john@example.com"
    )
    private String identifier;

    @NotBlank(message = "{validation.login.type.required}")
    @Schema(
            description = "Login type",
            allowableValues = {"EMAIL", "MOBILE"},
            example = "EMAIL"
    )
    private String loginType;
}