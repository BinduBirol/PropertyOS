package com.bnroll.common.dto.response;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiError {

    private String code;          // e.g. USER_NOT_FOUND
    private String message;       // human readable
    private int status;           // HTTP status code

    private Map<String, String> fieldErrors; // validation errors

    private String service;       // which microservice failed
}