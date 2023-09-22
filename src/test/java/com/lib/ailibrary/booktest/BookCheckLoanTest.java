package com.lib.ailibrary.booktest;

import com.lib.ailibrary.domain.book.BookLoanMapper;
import com.lib.ailibrary.domain.book.BookLoanRequest;
import com.lib.ailibrary.domain.book.BookLoanResponse;
import com.lib.ailibrary.domain.book.BookLoanService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class BookCheckLoanTest {

    /**@Autowired
    BookLoanService bookLoanService;

    @Autowired
    BookLoanMapper bookLoanMapper;

    @Test
    void checkLoan() {
        BookLoanRequest request = new BookLoanRequest();
        request.setUserId("green");
        request.setBookId(1);
        request.setLoanDate(LocalDate.parse("2023-07-10"));
        request.setReturnDate((LocalDate.parse("2023-07-24")));
        request.setReturnState("대출 중");

        BookLoanResponse bookState = bookLoanMapper.checkBookLoan(request.getBookId());

        //대출 가능한 경우. bookId로 봤을 때 loan 테이블에 없거나, 있다면 반납날짜가 모두 현재보다 과거일 경우.
        if(bookState == null || bookState.getReturnDate().isBefore(LocalDate.now())) {
            request.setReturnState("대출 중");
            bookLoanMapper.save(request);
        }
        //대출 불가능할 경우.
        else {
            request.setReturnState("대출 가능");
        }

    } */
}
