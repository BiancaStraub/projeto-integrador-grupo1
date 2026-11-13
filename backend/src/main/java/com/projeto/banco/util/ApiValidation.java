package com.projeto.banco.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public final class ApiValidation {
    private ApiValidation() { }

    public static String requiredText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " é obrigatório");
        }
        return value.trim();
    }

    public static void requireLength(String value, int maxLength, String field) {
        if (value.length() > maxLength) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " excede o limite permitido");
        }
    }
}
