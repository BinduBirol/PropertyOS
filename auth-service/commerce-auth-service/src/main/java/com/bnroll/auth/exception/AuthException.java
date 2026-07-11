package com.bnroll.auth.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AuthException extends RuntimeException {

    private final String code;
    private final HttpStatus status;
    private final Object[] args;

    public AuthException(String code, HttpStatus status) {
        this(code, status, null);
    }

    public AuthException(String code, HttpStatus status, Object... args) {
        super(code);
        this.code = code;
        this.status = status;
        this.args = args;
    }
}