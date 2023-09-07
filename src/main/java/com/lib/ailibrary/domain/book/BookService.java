package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookMapper bookMapper;

    /**
     * 도서 검색
     * @param bookName - 도서명으로 검색
     * @return 도서 정보
     */
    public Book findBookByName(final String bookName) {
        return bookMapper.findByName(bookName);
    }

    /**
     * 신착 도서 조회
     * @return - bookId 내림차순으로 5개 정도
     */
    public List<Book> findNewBook() {
        return bookMapper.findNew();
    }

    /**
     * 도서 목록 전체 조회
     * @return 도서 목록 전체
     */
    public List<Book> findAllBook() {
        return bookMapper.findAll();
    }
}
