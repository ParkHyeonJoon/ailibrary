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
