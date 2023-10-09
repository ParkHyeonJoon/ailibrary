package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookReserveMapper {
    /**
     * 도서 예약 정보 저장
     * @params param - 예약 정보
     */
    void save(BookReserveRequest param);

    /**
     * 도서 예약 정보 조회
     * @params bookRezId - PK
     * @return 예약 정보
     */
    BookReserveResponse findById(int bookRezId);

    /**
     * 도서 예약 정보 수정
     * @params param - 예약 정보
     */
    void update(BookReserveRequest param);

    /**
     * 도서 예약 정보 삭제
     * @params bookRezId - PK
     */
    void deletebyId(int bookRezId);

    /**
     * 도서 예약 내역 전체 조회
     * @return 예약 전체 조회
     */
    List<BookReserveResponse> findAll();

    /**
     * 도서 예약 상태 확인
     * @param bookId
     * @return bookRezId
     */
    Long checkBookRez(int bookId);

}
