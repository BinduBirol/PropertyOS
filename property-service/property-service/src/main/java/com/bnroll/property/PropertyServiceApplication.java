package com.bnroll.property;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
public class PropertyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyServiceApplication.class, args);
    }

}
