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
        // 이미 예약되었는지 확인
        Long existingReservation = bookReserveMapper.checkBookRez(request.getBookId());
        if (existingReservation == null) {
            // 예약 가능한 경우, 도서 예약 정보 저장
            bookReserveMapper.save(request);
        } else {
            // 이미 예약된 경우 예외 처리
            throw new RuntimeException("이미 예약된 도서입니다. (도서 ID: " + request.getBookId() + ")");
        }
    }

    public BookReserveResponse getReservationInfo(int bookRezId) {
        // 도서 예약 정보 조회
        return bookReserveMapper.findById(bookRezId);
    }
}

