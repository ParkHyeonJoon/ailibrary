package com.lib.ailibrary;

import com.lib.ailibrary.user.UserLoginRequest;
import com.lib.ailibrary.user.UserMapper;
import com.lib.ailibrary.user.UserRequest;
import com.lib.ailibrary.user.UserResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class UserMapperTest {

    @Autowired
    UserMapper userMapper;

    @Test
    void 회원가입() {
        UserRequest params = new UserRequest();
        params.setUserId("qwqw");
        params.setUserPw("1q2w");
        params.setUserEmail("qw1234@gmail.com");
        params.setUserStuId(20286051);
        params.setUserName("김철수");
        params.setUserGrade("2학년");
        params.setUserPnum("010-1234-5555");
        params.setUserMajor("전자");

        userMapper.join(params);
    }

    @Test
    void 로그인() {
        UserLoginRequest params = new UserLoginRequest();
        params.setUserId("abc");
        params.setUserPw("1234");

        List<UserResponse> resultList = userMapper.login(params);
        if(resultList.isEmpty()) {
            System.out.println("로그인 실패");
        } else {
            System.out.println("로그인 성공");
            System.out.println(resultList.toString());
        }
    }
}
