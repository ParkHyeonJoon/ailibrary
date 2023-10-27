package com.lib.ailibrary.domain.review;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {

    List<ReviewResponse> findReviewAll();
    List<ReviewResponse> findReviewByBookId(int bookId);

    void saveReview(ReviewRequest request);

    void updateReview(ReviewRequest request);

    void deleteReview(@Param("userStuId") long userStuId, @Param("bookId") int bookId);

}
