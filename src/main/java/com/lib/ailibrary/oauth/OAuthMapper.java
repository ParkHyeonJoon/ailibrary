package com.lib.ailibrary.oauth;

import com.lib.ailibrary.user.UserResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OAuthMapper {

    /**
     * 회원가입 여부 조회
     * @param checkId - 카카오 고유 id
     * @return userId - 값이 있으면 회원가입 O, 없으면 X
     */
    List<UserResponse> checkMember(String checkId);
}
