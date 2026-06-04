package com.bnroll.common.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    private boolean success;

    private T data;

    private ApiError error;

    private Meta meta;

    private LocalDateTime timestamp;

    private String path;

    private String correlationId;

    private String version;
}