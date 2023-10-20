package com.lib.ailibrary.domain.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원 정보 수정
     * @param params - 회원 정보
     * @return PK
     */
    @Transactional
    public int updateUser(final UserRequest params) {
        params.encodingPassword(passwordEncoder);
        userMapper.update(params);
        return params.getUserStuId();
    }

    /**
     * 회원 정보 삭제 (회원 탈퇴)
     * @param userStuId - PK
     * @return PK
     */
    @Transactional
    public Long deleteUserByUserStuId(final Long userStuId) {
        userMapper.deleteById(userStuId);
        return userStuId;
    }

    /**
     * 회원 수 카운팅 (ID 중복 체크)
     * @param userId - UK
     * @return 회원 수
     */
    public int countUserByUserId(final String userId) {
        return userMapper.countByLoginId(userId);
    }
}
