package com.lib.ailibrary.jwt.dto;

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

/*    @NotNull
    @Size(min = 3, max = 20)
    private String userStuId;

    @NotNull
    @Size(min = 3, max = 50)
    private String userName;

    @NotNull
    @Size(min = 3, max = 30)
    private String userMajor;

    @NotNull
    @Size(min = 3, max = 30)
    private String userEmail;

    @NotNull
    @Size(min = 3, max = 15)
    private String userPnum;

    @NotNull
    @Size(min = 3, max = 30)
    private String userId;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String userPw;

    @NotNull
    @Size(min = 3, max = 10)
    private String userGrade;*/

    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

}
