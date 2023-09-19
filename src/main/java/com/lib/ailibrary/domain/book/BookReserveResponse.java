package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookReserveResponse {
    private Long bookRezId;
    private int userStuId;
    private int bookId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookRezDate;
}
