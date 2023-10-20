package com.lib.ailibrary.domain.user.jwt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @NotNull
    private Long userStuId;

    @NotNull
    @Size(min = 1, max = 30)
    private String userName;

    @NotNull
    @Size(min = 1, max = 30)
    private String userId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 1, max = 70)
    private String userPw;

    @NotNull
    @Size(min = 1, max = 30)
    private String userMajor;

    @NotNull
    @Size(min = 1, max = 10)
    private String userGrade;

    @NotNull
    @Size(min = 1, max = 30)
    private String userEmail;

    @NotNull
    @Size(min = 1, max = 15)
    private String userPnum;

}
