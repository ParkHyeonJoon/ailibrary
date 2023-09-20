package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {
    /**
     * 도서 검색(도서 정보 조회)
     * @params - bookTitle - 도서명으로 검색
     * @return 도서 정보
     */
    Book findByTitle(String bookTitle);

    /**
     * 신착 도서 조회
     * @return - book_date 순으로
     */
    List<Book> findNew();

    /**
     * 인기 도서 조회
     * @return - book_good 순으로
     */
    List<Book> findGood();

    /**
     * 도서 목록 전체 조회
     * @return 도서 목록 전체
     */
    List<Book> findAll();

    /**
     * ID별 도서 조회
     * @param bookId
     */
    Book findById(int bookId);

    /**
     * 키워드 입력으로 도서 검색 기능
     * @param keyword
     */
    List<Book> find(String keyword);

    /**
     * 도서 찜 누르기 기능
     * @param - bookId
     */
    void increaseBookGood(int bookId);


}
