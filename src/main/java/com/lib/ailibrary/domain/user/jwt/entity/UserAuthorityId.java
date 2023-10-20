package com.lib.ailibrary.domain.user.jwt.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthorityId implements Serializable {

    @Column(name = "user_stu_id")
    private Long userStuId;

    @Column(name = "authority_name")
    private String authorityName;
}
