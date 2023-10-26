package com.lib.ailibrary.domain.book;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookLoanService {

    private final BookLoanMapper bookLoanMapper;

    @Transactional
    public void saveLoan(BookLoanRequest param) {
        bookLoanMapper.save(param);
    }

    public List<BookLoanResponse> findLoanAll() {
        return bookLoanMapper.findByAll();
    }

    public void deleteLoanById(final int bookLoanId) {
        bookLoanMapper.deleteById(bookLoanId);
    }

    //이 도서가 대출이 가능한지 여부 확인
    public int checkBookLoan(int bookId) {
        //tb_book_loan에 없다면 대출 가능 -> null, tb_book_loan에 있으면 대출 가능/대출 중 반환
        int bookLoanState = bookLoanMapper.checkBookLoan(bookId);
        return bookLoanState;
    }

    //현재 사용자가 도서를 대출 중인지 확인(대출 중이면 반납하기, 아니면 대출하기)
    public int checkBook(String userId, int bookId) {
        int bookLoan = bookLoanMapper.checkBook(userId, bookId);
        return bookLoan;
    }

    //현재 사용자가 도서를 몇 권 대출했는지. 5권 미만이어야 대출 가능
    public int checkBookCount(String userId) {
        int bookLoanCount = bookLoanMapper.checkBookCount(userId);
        return bookLoanCount;
    }

    //도서 반납하기
    public void checkBookReturn(String userId, int bookId) {
        bookLoanMapper.checkBookReturn(userId, bookId);
    }

    //사용자가 현재 대출 중인 도서 확인
    public List<BookLoanResponse> checkBookLoaning(String userId) {
        return bookLoanMapper.checkBookLoaning(userId);
    }
}
