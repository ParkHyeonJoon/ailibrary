package com.lib.ailibrary.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {

    private String userId; // 로그인 아이디
    private String userPw; // 로그인 비밀번호
}
