package com.lib.ailibrary.reviewtest;

import com.lib.ailibrary.domain.review.ReviewRequest;
import com.lib.ailibrary.domain.review.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReviewServiceTest {
    @Autowired
    private ReviewService reviewService;

    @Test
    void saveReview() {
        ReviewRequest request = new ReviewRequest();
        request.setUserStuId(20232323);
        request.setBookId(11);
        request.setReview("굉장히 흥미있는 책이다. 과학적인 지식이 충분하지 않아도 읽기 좋다");
        reviewService.saveReview(request);
    }
}
