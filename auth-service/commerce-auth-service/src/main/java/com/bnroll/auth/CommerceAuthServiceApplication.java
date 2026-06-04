package com.bnroll.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication(scanBasePackages = "com.bnroll")
@EntityScan("com.bnroll.commercedomain.entity")
@ComponentScan(basePackages = "com.bnroll")
public class CommerceAuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommerceAuthServiceApplication.class, args);
    }

}
