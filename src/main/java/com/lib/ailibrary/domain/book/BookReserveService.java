package com.lib.ailibrary.domain.book;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookReserveService {

    private final BookReserveMapper bookReserveMapper;

    /**
     * 도서 예약 정보 저장
     * @param params - 예약 정보
     * @return bookRezId - PK
     */
    @Transactional
    public int saveRez(BookReserveRequest params) {
        bookReserveMapper.save(params);
        return params.getBookRezId();
    }

    /**
     * 에약 정보 조회
     * @param bookRezId - PK
     * @return 예약 정보
     */
    public BookReserveResponse findRezById(final int bookRezId) {
        return bookReserveMapper.findById(bookRezId);
    }

    /**
     * 예약 정보 수정(보류)
     */

    /**
     * 예약 정보 삭제
     * @param bookRezId - PK
     * @return bookRezId
     */
    public int deleteRezById(final int bookRezId) {
        bookReserveMapper.deletebyId(bookRezId);
        return bookRezId;
    }

    /**
     * 예약 내역 전체 조회
     * @return 예약 내역 전체
     */
    public List<BookReserveResponse> findAllRez() {
        return bookReserveMapper.findAll();
    }

    /**
     * 도서 예약 상태 확인(예약 중인지)하고 예약
     * @param
     * @return bookRezId
     */
    public void reserveBook(BookReserveRequest request) {
        bookReserveMapper.save(request);
    }

    /**
     * count로 도서 예약 확인
     */
    public int checkReserve(int bookId) {
        int bookReserve = bookReserveMapper.checkReserve(bookId);
        return bookReserve;
    }

    /**
     * bookId로 예약 취소
     */
    public void cancelReserve(List<Integer> bookId) {
        // 예약 취소 처리를 여기서 수행
        bookReserveMapper.cancelReserve(bookId);
    }

    /**
     * 예약해놓은 도서 대출하면 예약 자동 취소
     */
    public void cancelAuto(int bookId) {
        bookReserveMapper.cancelAuto(bookId);
    }

    /**
     * 사용자가 예약한 도서 조회
     * userId로 조회
     */
    public List<BookReserveResponse> checkBookReserve(long userStuId) {
        List<BookReserveResponse> reserveBookList = bookReserveMapper.checkBookReserve(userStuId);
        return reserveBookList;
    }

    /**
     * 대출하려는 도서가 예약이 된 도서인지
     * bookId로 조회해서 userId 조회
     */
    public Long checkWhoReserve(int bookId) {
        return bookReserveMapper.checkWhoReserve(bookId);
    }

    /**
     * 예약한 도서의 예약 유효 기간 확인
     */
   // public LocalDate checkReserveDate(int bookId) {
     //   LocalDate returnDate = bookReserveMapper.checkReserveDate(bookId);
       // return returnDate;
    //}
}

