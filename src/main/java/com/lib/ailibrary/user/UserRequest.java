// 클라이언트에서 서버로 회원가입 요청을 보낼 때 사용하는 DTO(Data Transfer Object) 클래스
package com.lib.ailibrary.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    private int userStuId;      // 학번 PK
    private String userName;    // 학생 이름
    private String userMajor;   // 학과
    private String userGrade;   // 학생 학년
    private String userEmail;   // 학생 이메일
    private String userPnum;    // 학생 전화번호
    private String userId;      // 로그인 아이디
    private String userPw;      // 로그인 비밀번호
}
