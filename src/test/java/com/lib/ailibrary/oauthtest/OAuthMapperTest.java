package com.lib.ailibrary.oauthtest;

import com.lib.ailibrary.domain.user.oauth.OAuthMapper;
import com.lib.ailibrary.domain.user.UserResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class OAuthMapperTest {

    @Autowired
    OAuthMapper oAuthMapper;

    @Test
    void 회원가입여부조회() {
        List<UserResponse> userInfo = oAuthMapper.checkMember("abc");


        if(userInfo.isEmpty()) {
            System.out.println("회원가입이 되지 않은 회원입니다.");
        } else {
            System.out.println("회원가입이 된 회원입니다.");
            System.out.println(userInfo.get(0));
        }
    }
}
