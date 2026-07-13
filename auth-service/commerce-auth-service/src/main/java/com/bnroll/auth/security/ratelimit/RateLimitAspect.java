package com.bnroll.auth.security.ratelimit;

import com.bnroll.commercedomain.exception.AuthException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
@RequiredArgsConstructor
public class RateLimitAspect {

    private final RateLimitService rateLimitService;
    private final HttpServletRequest request;

    @Around("@annotation(rateLimit)")
    public Object handleRateLimit(ProceedingJoinPoint joinPoint,
                                  RateLimit rateLimit) throws Throwable {

        String ip = request.getRemoteAddr();

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        String methodName = method.getName();

        String key = methodName + ":" + ip;

        boolean allowed = rateLimitService.allowRequest(
                key,
                rateLimit.limit(),
                rateLimit.durationSeconds()
        );

        if (!allowed) {
            throw new AuthException("too.many.requests", HttpStatus.TOO_MANY_REQUESTS);
        }

        return joinPoint.proceed();
    }
}