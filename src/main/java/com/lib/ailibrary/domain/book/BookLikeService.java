package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookLikeService {

    private final BookLikeMapper bookLikeMapper;

    /**
     * 찜 중복 확인 기능
     * @param - userStuId, bookId
     * @return - 0 or 1
     */
    public boolean isUserLikeBook(int userStuId, int bookId) {
        int count = bookLikeMapper.isUserLikeBook(userStuId, bookId);
        return count > 0;
    }

    /**
     * 찜하기 기능
     * @oaram - userStuId, bookId
     */
    public void likeBook(int userStuId, int bookId) {
        bookLikeMapper.isLike(userStuId, bookId);
    }

    public void unlikeBook(int userStuId, int bookId) {

        bookLikeMapper.unLike(userStuId, bookId);
    }
}
