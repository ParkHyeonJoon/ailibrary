package com.lib.ailibrary.domain.review;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/save")
    public void saveReview(@RequestBody ReviewRequest request) {
        ReviewRequest reviewRequest = new ReviewRequest();
        Long userStuId = request.getUserStuId();
        int bookId = request.getBookId();
        String review = request.getReview();

        reviewRequest.setUserStuId(userStuId);

        reviewRequest.setBookId(bookId);
        reviewRequest.setReview(review);

        reviewService.saveReview(reviewRequest);
    }
    @GetMapping("/all")
    public List<ReviewResponse> findReviewAll() {
        List<ReviewResponse> allReview = reviewService.findReviewAll();
        return allReview;
    }

    @GetMapping("/{bookId}")
    public List<ReviewResponse> findReviewByBookId(@PathVariable int bookId) {
        List<ReviewResponse> reviewByBookId = reviewService.findReviewByBookId(bookId);
        return reviewByBookId;
    }
}
