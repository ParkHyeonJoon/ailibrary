package com.lib.ailibrary.domain.book;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookLikeRequest {

    private String userId; //사용자 아이디
    private int bookId;   //도서 아이디
}
