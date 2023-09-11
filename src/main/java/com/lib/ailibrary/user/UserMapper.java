package com.lib.ailibrary.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    /**
     * 회원가입 (회원 정보 저장)
     * @param params - 회원정보
     */
    void join(UserRequest params);

    /**
     * 회원 상세정보 조회
     * @param userId - UK
     * @return 회원정보
     */
    UserResponse findByLoginId(String userId);
//    List<UserResponse> login(UserLoginRequest params);

    /**
     * 회원 정보 수정
     * @param params - 회원 정보
     */
    void update(UserRequest params);

    /**
     * 회원 정보 삭제 (회원 탈퇴)
     * @param id - PK
     */
    void deleteById(int id);

    /**
     * 회원 수 카운팅 (ID 중복 체크)
     * @param loginId - UK
     * @return 회원 수
     */
    int countByLoginId(String loginId);



    /* *//**
     * 로그인 ID 체크
     * @param userId - 로그인 아이디
     * @return ID 일치 여부
     *//*
    int idCheck(String userId);

    *//**
     * 로그인 PW 체크
     * @param userPw - 로그인 비밀번호
     * @return PW 일치 여부
     *//*
    int pwCheck(String userPw);*/
}
