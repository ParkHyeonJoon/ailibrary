package com.lib.ailibrary.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    /**
     * 회원 정보 수정
     * @param params - 회원 정보
     */
    void update(UserRequest params);

    /**
     * 회원 정보 삭제 (회원 탈퇴)
     * @param userStuId - PK
     */
    void deleteById(Long userStuId);

    /**
     * 회원 수 카운팅 (ID 중복 체크)
     * @param loginId - UK
     * @return 회원 수
     */
    int countByLoginId(String loginId);

    /**
     * 회원 전화번호 가져오기
     * @param userStuId - PK
     * @return 전화번호
     */
    String findPNumById(Long userStuId);
}
