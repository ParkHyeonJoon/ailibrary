package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {
    /**
     * 도서 검색(도서 정보 조회)
     * @params bookName - 도서명으로 검색
     * @return 도서 정보
     */
    Book findByName(String bookName);

    /**
     * 신착 도서 조회
     * @return - bookId 내림차순으로 5개 정도
     */
    List<Book> findNew();

    /**
     * 도서 목록 전체 조회
     * @return 도서 목록 전체
     */
    List<Book> findAll();

}
