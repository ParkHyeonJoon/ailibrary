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

    @Scheduled(cron = "0 0 12 * * *") //fixedRate = 60000 (1분마다) cron = "0 0 12 * * *"
    public void reviewSummary() {
        int[] allBookId = bookService.findAllBookId();  // 모든 도서 번호 가져오기

        for (int i : allBookId) {
            List<ReviewResponse> reviewList = reviewService.findReviewByBookId(i); // 각 도서별 리뷰 가져오기

            if (reviewList.isEmpty()) { // 리뷰 없으면 다음 도서
                continue;
            }


            StringBuilder stringBuilder = new StringBuilder();
            for (ReviewResponse review : reviewList) {
                stringBuilder.append(review.getReview()).append(" "); // 리뷰 합치기
            }
            String reviews = stringBuilder.toString();
            String reviewSummary = reviewApiService.sendPostRequest(reviews); // 합친 리뷰 GPT한테 보내기
            bookService.updateReviewSummary(reviewSummary, i);     // 요약한 리뷰 db에 저장
        }
    }
}
