package com.lib.ailibrary.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    /**
     * 회원가입
     * @param params - 회원 정보
     */
    public void join(final UserRequest params) {
        userMapper.join(params);
    }

    /**
     * 로그인
     * @param params - 로그인 정보 (ID, PW)
     * @return 회원정보
     */
    public List<UserResponse> login(final UserLoginRequest params) {
        return userMapper.login(params);
    }
}
