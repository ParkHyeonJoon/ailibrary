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
     * 장르별 도서 조회 - 장르 : 소설
     * @return - category = "소설" + book_good순으로
     */
    List<Book> findGenreFiction();

    List<Book> findGenreDevelopment();

    List<Book> findGenreScience();

    List<Book> findGenreComic();

    List<Book> findGenreEssay();

    List<Book> findGenreEconomy();

    List<Book> findGenreBiographical();


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

    /**
     * 도서 찜 취소 기능
     * @param - bookId
     */
    void decreaseBookGood(int bookId);

    /**
     * 찜하기 정보 저장
     * @param - userStuId, bookId
     */
    void isLike(@Param("userId") String userId, @Param("bookId") int bookId);

    /**
     * 찜하기 정보 삭제
     * @param - userStuId, bookId
     */
    void unLike(@Param("userId") String userId, @Param("bookId") int bookId);


    /**
     * 찜 중복 체크
     */
    int checkUserLike(@Param("userId") String userId, @Param("bookId") int bookId);

    /**
     * 사용자가 찜한 도서 목록 조회
     * @params - userId
     */
    List<Book> checkLikeBook(String userId);

    /**
     * 사용자가 예약해놓았던 도서 제목 조회
     */
    String reserveBookTitle(int bookId);

}