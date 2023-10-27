package com.lib.ailibrary.domain.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponse {
    private int reviewId;
    private long userStuId;
    private int bookId;
    private String review;
}
