package com.bnroll.auth.dto;

import com.bnroll.commercedomain.enums.user.RoleName;
import com.bnroll.dto.property.FacilityType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "User registration request")
public class RegisterRequest {

    @Schema(
            description = "User email address",
            example = "bindu@gmail.com"
    )
    @NotBlank(message = "{email.required}")
    private String email;

    @Schema(
            description = "User password",
            example = "P@ssw0rd123"
    )
    @NotBlank(message = "{password.required}")
    private String password;

    @Schema(
            description = "User's first name",
            example = "Birol"
    )
    @NotBlank(message = "{firstName.required}")
    private String firstName;

    @Schema(
            description = "User's last name",
            example = "Bindu"
    )
    @NotBlank(message = "{lastName.required}")
    private String lastName;

    @Schema(
            description = "Mobile phone number",
            example = "01830444758"
    )
    @NotBlank(message = "{phone.required}")
    private String phone;

    @Schema(
            description = "Role assigned to the user",
            example = "OWNER"
    )
    @NotNull(message = "{role.required}")
    private RoleName role;


    @Schema(
            description = "Facility title",
            example = "Green View Apartments"
    )
    @NotBlank(message = "{facilityTitle.required}")
    private String facilityTitle;

    @Schema(
            description = "Type of facility",

            example = "RESIDENTIAL"
    )
    @NotNull(message = "{facilityType.required}")
    private FacilityType facilityType;

    @Schema(
            description = "Facility address line 1",
            example = "House 12, Road 5, Banani"
    )
    @NotBlank(message = "{addressLine1.required}")
    private String addressLine1;

    @Schema(
            description = "Facility description",
            example = "A 20-bed diagnostic center offering pathology and imaging services"
    )
    private String description;
}