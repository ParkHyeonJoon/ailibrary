package com.lib.ailibrary.domain.review;

import com.lib.ailibrary.domain.book.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewScheduler {

    private final BookService bookService;
    private final ReviewService reviewService;
    private final ReviewApiService reviewApiService;

    @Scheduled(cron = "0 0 12 * * *") //fixedRate = 60000(1분마다) cron = "0 0 12 * * *"
    public void reviewSummary() {
        int[] allBookId = bookService.findAllBookId();

        for(int i=0; i<allBookId.length; i++) {
            List<ReviewResponse> reviewList = reviewService.findReviewByBookId(allBookId[i]);

            if(reviewList.isEmpty()) {
                continue;
            }

            String reviews = "";
            for(ReviewResponse review : reviewList) {
                reviews += review.getReview() + " ";

            }
            String reviewSummary = reviewApiService.sendPostRequest(reviews);
            bookService.updateReviewSummary(reviewSummary, allBookId[i]);
        }
    }
}
