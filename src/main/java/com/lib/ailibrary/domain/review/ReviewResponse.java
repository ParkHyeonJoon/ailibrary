package com.lib.ailibrary.domain.review;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewResponse {
    private int reviewId;
    private long userStuId;
    private String userId;
    private int bookId;
    private String review;
    private LocalDate reviewDate;
}
