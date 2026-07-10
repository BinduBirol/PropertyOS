package com.bnroll.auth.dto.forgetpassword;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetPasswordRequest {

    @NotBlank(message = "{validation.reset.token.required}")
    @Schema(
            description = "Password reset token",
            example = "eyJhbGciOiJIUzI1NiJ9..."
    )
    private String token;

    @NotBlank(message = "{validation.password.required}")
    @Size(min = 8, message = "{validation.password.size}")
    @Schema(
            description = "New password",
            example = "MySecurePassword123!"
    )
    private String password;
}