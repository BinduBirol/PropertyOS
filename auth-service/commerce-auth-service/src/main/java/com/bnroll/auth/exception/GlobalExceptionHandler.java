package com.bnroll.auth.exception;

import com.bnroll.common.dto.response.ApiError;
import com.bnroll.common.dto.response.ApiResponse;
import com.bnroll.common.i18n.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Locale;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageService messageService;
    @Value("${spring.application.name}")
    private String serviceName;

    // AUTH ERROR
    @ExceptionHandler(AuthException.class)
    public ApiResponse<?> handleAuthException(AuthException ex,
                                              HttpServletRequest request) {

        Locale locale = new Locale("bn", "BD");

        return ApiResponse.builder()
                .success(false)
                .error(ApiError.builder()
                        .code(ex.getCode())
                        .message(messageService.get(ex.getCode(), locale))
                        .status(ex.getStatus().value())
                        .service(serviceName)
                        .build())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .version("v1")
                .build();
    }

    // GENERIC ERROR
    @ExceptionHandler(Exception.class)
    public ApiResponse<?> handleGeneralException(Exception ex, HttpServletRequest request) {

        //Locale locale = Locale.ENGLISH;

        Locale locale = new Locale("bn", "BD");

        return ApiResponse.builder()
                .success(false)
                .error(ApiError.builder()
                        .code("internal.server.error")
                        .message(messageService.get("internal.server.error", locale))
                        .status(500)
                        .service(serviceName)
                        .build())
                .timestamp(LocalDateTime.now())
                .path(request.getRequestURI())
                .version("v1")
                .build();
    }




}