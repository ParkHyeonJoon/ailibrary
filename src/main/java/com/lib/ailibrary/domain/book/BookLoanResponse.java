package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDate;

//도서 정보가 있는 Book을 상속 받으면서 bookId는 Book 클래스에 있는 거 사용
@Getter
public class BookLoanResponse extends Book{
    private int bookLoanId;
    private String userId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate loanDate; //대출 날짜

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate; //반납 날짜

    private String returnState; //대출 상태
}
