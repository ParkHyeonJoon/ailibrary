package com.lib.ailibrary.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원가입 (회원 정보 저장)
     * @param params - 회원 정보
     * @return PK
     */
    @Transactional
    public int join(final UserRequest params) {
        params.encodingPassword(passwordEncoder);
        userMapper.join(params);
        return params.getUserStuId();
    }

    /**
     * 회원 상세정보 조회
     * @param  userId - UK
     * @return 회원정보
     */
    public UserResponse findUserByUserId(final String userId) {
        return userMapper.findByLoginId(userId);
    }

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
    public int deleteUserByUserStuId(final int userStuId) {
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

    /**
     * 로그인
     * @param userId - 로그인 ID
     * @param userPw - 비밀번호
     * @return 회원 상세정보
     */
    public UserResponse login(final String userId, final String userPw) {

        // 1. 회원 정보 및 비밀번호 조회
        UserResponse user = findUserByUserId(userId);
        String encodedPassword = (user == null) ? "" : user.getUserPw();

        // 2. 회원 정보 및 비밀번호 체크
        if (user == null || passwordEncoder.matches(userPw, encodedPassword) == false) {
            return null;
        }

        // 3. 회원 응답 객체에서 비밀번호를 제거한 후 회원 정보 리턴
        user.clearPassword();
        return user;
    }
}
