package com.lib.ailibrary.domain.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Book {

    private int bookId; //도서 아이디 PK
    private String bookTitle; //도서명
    private String author; //작가명
    private int publishedDate; //출판연도
    private String publisher; //출판사
    private String category; //카테고리
    private int floor; //층수
    private int bookGood; //도서 찜 횟수(인기순 구별)
    private String bookDate; //도서 입고날짜(신착 도서)
}
