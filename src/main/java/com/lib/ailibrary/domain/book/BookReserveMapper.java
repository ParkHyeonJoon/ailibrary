package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface BookReserveMapper {
    /**
     * 도서 예약 정보 저장
     * @params param - 예약 정보
     */
    void save(BookReserveRequest request);

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
     * 도서 예약 내역 확인
     * @params bookId
     * @return count
     */
    int checkReserve(int bookId);

    /**
     * 도서 선택 예약 취소
     */
    void cancelReserve(List<Integer> bookId);

    /**
     * 예약해놓은 도서 대출하면 자동 취소
     */
    void cancelAuto(int bookId);

    /**
     * 해당 사용자가 예약한 도서 목록 조회
     * @param - userId
     * @return - BookReserveResponse
     */
    List<BookReserveResponse> checkBookReserve(long userStuId);

    /**
     * 사용자가 대출하려는 도서가 예약된 도서인지
     * @param - bookId
     * @return - userId
     */
    Long checkWhoReserve(int bookId);

    /**
     * 예약한 도서 예약 유효날짜 확인
     * @param - bookId
     * @return - returnDate
     */
    //LocalDate checkReserveDate(int bookId);



}
