package com.bnroll.common.i18n;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class MessageService {

    private final MessageSource messageSource;

    public MessageService(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String get(String key, Locale locale) {
        return messageSource.getMessage(key, null, locale);
    }
}