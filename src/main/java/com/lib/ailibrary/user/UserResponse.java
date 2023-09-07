package com.lib.ailibrary.user;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponse {

    private int userStuId;      // 학번 PK
    private String userName;    // 학생 이름
    private String userMajor;   // 학과
    private String userEmail;   // 학생 이메일
    private String userPnum;    // 학생 전화번호
    private String userId;      // 로그인 아이디
    private String userPw;      // 로그인 비밀번호
    private String userGrade;   // 학생 학년

}


