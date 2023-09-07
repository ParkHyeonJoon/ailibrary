package com.lib.ailibrary.domain.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Book {

    private int bookId; //도서 아이디 PK
    private String bookName; //도서명
    private String author; //작가명
    private String publishedDate; //출판일
    private String publisher; //출판사
    private String category; //카테고리
    private int floor; //층수
    private String location; //청구기호
}
