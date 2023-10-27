package com.lib.ailibrary.domain.review;

import lombok.Getter;

@Getter
public class ReviewResponse {
    private int reviewId;
    private long userStuId;
    private int bookId;
    private String review;
}
