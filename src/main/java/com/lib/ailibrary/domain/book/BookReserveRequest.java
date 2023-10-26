package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookReserveRequest extends Book {
    private int bookRezId;
    private String userId;
    private Long userStuId;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookRezDate;

    public BookReserveRequest(String userId, int bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }
}
