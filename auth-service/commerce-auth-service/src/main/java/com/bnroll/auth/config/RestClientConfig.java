package com.bnroll.auth.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient propertyRestClient(
            @Value("${services.property.base-url}") String propertyBaseUrl) {

        return RestClient.builder()
                .baseUrl(propertyBaseUrl)
                .build();
    }
}