package com.lib.ailibrary.domain.book;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookReserveResponse extends Book{
    private int bookRezId;
    private String userId;
    private Long userStuId;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate bookRezDate;
}
