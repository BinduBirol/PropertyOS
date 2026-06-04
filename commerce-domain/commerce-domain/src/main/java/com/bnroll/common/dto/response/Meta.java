package com.bnroll.common.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meta {

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;

    private String message;
}