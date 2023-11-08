package com.lib.ailibrary.domain.review;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewRequest {
    private int reviewId; // 리뷰 아이디
    private long userStuId; // 학생 학번
    private String userId;
    private int bookId; //도서 아이디
    private String review; // 리뷰 내용
    private LocalDate reviewDate;
}
