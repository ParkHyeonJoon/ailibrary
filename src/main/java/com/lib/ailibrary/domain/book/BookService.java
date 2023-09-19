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
     * @param bookTitle - 도서명으로 검색
     * @return 도서 정보
     */
    public Book findBookByTitle(final String bookTitle) {
        return bookMapper.findByTitle(bookTitle);
    }

    /**
     * 신착 도서 조회
     * @return - book_date 순으로
     */
    public List<Book> findNewBook() {
        return bookMapper.findNew();
    }

    /**
     * 인기 도서 조회
     * @return - book_good 순으로
     */
    public List<Book> findGoodBook() {
        return bookMapper.findGood();
    }

    /**
     * 도서 목록 전체 조회
     * @return 도서 목록 전체
     */
    public List<Book> findAllBook() {
        return bookMapper.findAll();
    }

    /**
     * 도서 ID로 검색
     * @param bookId - 도서 ID로 검색
     * @return 도서 정보
     */
    public Book findBookById(int bookId) {
        return bookMapper.findById(bookId);
    }

    /**
     * 도서 검색 기능
     * @param keyword
     */
    public List<Book> findBookByKeyword(String keyword) {
        keyword = "%" + keyword + "%";
        return bookMapper.find(keyword);
    }
}
