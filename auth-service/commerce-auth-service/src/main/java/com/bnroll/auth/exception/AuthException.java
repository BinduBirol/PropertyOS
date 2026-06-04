package com.bnroll.auth.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AuthException extends RuntimeException {

    private final String code;
    private final HttpStatus status;

    public AuthException(String code, HttpStatus status) {
        super(code);
        this.code = code;
        this.status = status;
    }
}