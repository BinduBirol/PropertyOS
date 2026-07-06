package com.bnroll.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "{email.required}")
    private String email;

    @NotBlank(message = "{password.required}")
    private String password;

    @NotBlank(message = "{firstName.required}")
    private String firstName;

    @NotBlank(message = "{lastName.required}")
    private String lastName;

    @NotBlank(message = "{phone.required}")
    private String phone;

    @NotBlank(message = "{role.required}")
    private String role;
}