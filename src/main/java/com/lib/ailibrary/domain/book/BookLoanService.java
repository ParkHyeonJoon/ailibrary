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

    public BookLoanResponse findLoanbyId(final int bookLoanId) {
        return bookLoanMapper.findById(bookLoanId);
    }

    public void deleteLoanById(final int bookLoanId) {
        bookLoanMapper.deleteById(bookLoanId);
    }

    public int checkBookLoan(int bookId) {
        //return_state를 확인, tb_book_loan에 없다면 대출 가능 -> null, tb_book_loan에 있으면 대출 가능/대출 중 반환
        int bookLoanState = bookLoanMapper.checkBookLoan(bookId);
        return bookLoanState;

    }

    public int checkBook(String userId, int bookId) {
        int bookLoan = bookLoanMapper.checkBook(userId, bookId);
        return bookLoan;
    }

    public int checkBookCount(String userId) {
        int bookLoanCount = bookLoanMapper.checkBookCount(userId);
        return bookLoanCount;
    }

    public void checkBookReturn(String userId, int bookId) {
        bookLoanMapper.checkBookReturn(userId, bookId);
    }

    public List<BookLoanResponse> checkBookLoaning(String userId) {
        return bookLoanMapper.checkBookLoaning(userId);
    }
}
