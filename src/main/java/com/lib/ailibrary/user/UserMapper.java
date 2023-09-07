package com.lib.ailibrary.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    /**
     * 회원가입
     * @param params - 회원정보
     */
    void join(UserRequest params);

    /**
     * 로그인
     * @param params - 로그인 정보 (ID, PW)
     * @return 회원정보
     */
    List<UserResponse> login(UserLoginRequest params);
}
