package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookLoanRequest {
    private int bookLoanId; //대출 아이디
    private String userId; //학생 아이디
    private int bookId; //도서 아이디

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate loanDate; //대출 날짜

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate; //반납 날짜

    private String returnState; //대출 상태
}
