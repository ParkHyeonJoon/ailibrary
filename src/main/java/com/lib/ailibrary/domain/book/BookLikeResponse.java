package com.lib.ailibrary.domain.book;

import lombok.Getter;

@Getter
public class BookLikeResponse {
    private int likeId; //찜 아이디
    private Long userStuId; //학번
    private Long bookKid;   //도서 아이디
}
