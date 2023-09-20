package com.lib.ailibrary.jwt.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    @NotNull
    @Size(min = 3, max = 30)
    private String userId;

    @NotNull
    @Size(min = 3, max = 70)
    private String userPw;
}
