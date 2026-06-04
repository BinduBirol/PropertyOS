package com.bnroll.auth.security.ratelimit;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RateLimit {
    int limit() default 5;
    int durationSeconds() default 60;
}