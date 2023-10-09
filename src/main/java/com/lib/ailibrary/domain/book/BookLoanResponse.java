package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookLoanResponse {
    private int bookLoanId;
    private String userId;
    private int bookId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate loanDate; //대출 날짜

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate; //반납 날짜

    private String returnState; //대출 상태
}
