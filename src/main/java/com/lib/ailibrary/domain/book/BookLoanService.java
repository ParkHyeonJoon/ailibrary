package com.lib.ailibrary.domain.book;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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

        //대출 가능한 경우. bookId로 봤을 때 loan 테이블에 없거나, 있다면 반납날짜가 모두 현재보다 과거일 경우.
        /**if(bookState == null || bookState.getReturnDate().isBefore(LocalDate.now())) {
            request.setReturnState("대출 중");
            bookLoanMapper.save(request);
        }
        //대출 불가능할 경우.
        else {
            request.setReturnState("대출 중");
        } */
    }
}
