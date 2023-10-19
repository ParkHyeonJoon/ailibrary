package com.lib.ailibrary.domain.book;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public int cancelReserve(int bookId) {
        return bookReserveMapper.cancelReserve(bookId);
    }

    /**
     * 사용자가 예약한 도서 조회
     * userId로 조회
     */
    public List<BookReserveResponse> checkBookReserve(String userId) {
        List<BookReserveResponse> reserveBookList = bookReserveMapper.checkBookReserve(userId);
        return reserveBookList;
    }

}

