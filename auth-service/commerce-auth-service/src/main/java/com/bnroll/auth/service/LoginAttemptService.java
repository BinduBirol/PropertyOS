package com.bnroll.auth.service;


import com.bnroll.auth.entity.user.User;
import com.bnroll.commercedomain.enums.user.LoginType;
import com.bnroll.commercedomain.enums.user.RoleName;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotBlank;

public interface LoginAttemptService {

    void log(
            User user,
            String identifier,
            LoginType loginType,
            RoleName role,
            boolean success,
            String failureReason,
            HttpServletRequest request
    );


}