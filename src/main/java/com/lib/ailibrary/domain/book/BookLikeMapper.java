package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

@Mapper
public interface BookLikeMapper {

    /**
     * 찜하기 정보 저장
     * @param - userStuId, bookId
     */
    void isLike(@Param("userStuId") int userStuId, @Param("bookId") int bookId);

    /**
     * 찜하기 정보 삭제
     * @param - userStuId, bookId
     */
    void unLike(@Param("userStuId") int userStuId, @Param("bookId") int bookId);


    /**
     * 찜 중복 체크
     */
    int isUserLikeBook(@Param("userStuId") int userStuId, @Param("bookId") int bookId);
}
