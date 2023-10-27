package com.lib.ailibrary.domain.review;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper reviewMapper;

    @Transactional
    public void saveReview(ReviewRequest request) {
        reviewMapper.saveReview(request);
    }

    public List<ReviewResponse> findReviewAll() {
        return reviewMapper.findReviewAll();
    }

    public List<ReviewResponse> findReviewByBookId(int bookId) {
        return reviewMapper.findReviewByBookId(bookId);
    }

    public void updateReview(ReviewRequest request) {
        reviewMapper.updateReview(request);
    }

    public void deleteReview(long userStuId, int bookId) {
        reviewMapper.deleteReview(userStuId, bookId);
    }
}
