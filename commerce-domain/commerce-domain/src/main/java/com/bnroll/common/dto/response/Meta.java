package com.bnroll.common.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Response metadata")
public class Meta {

    @Schema(
            description = "Current page number (0-based)",
            example = "0"
    )
    private int page;

    @Schema(
            description = "Number of records per page",
            example = "20"
    )
    private int size;

    @Schema(
            description = "Total number of matching records",
            example = "125"
    )
    private long totalElements;

    @Schema(
            description = "Total number of pages",
            example = "7"
    )
    private int totalPages;

    @Schema(
            description = "Additional response message",
            example = "User registered successfully."
    )
    private String message;
}