package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    //도서관에 있는 모든 도서 조회
    @GetMapping("/all")
    public List<Book> findAllBook() {
        List<Book> book = bookService.findAllBook();
        return book;
    }

    //도서 ID별 도서 조회
    @GetMapping("/{bookId}")
    public Book findBookById(@PathVariable int bookId) {
        Book book = bookService.findBookById(bookId);
        return book;
    }

    //인기순 도서 조회
    @GetMapping("/top")
    public List<Book> findGoodBook() {
        List<Book> book = bookService.findGoodBook();
        return book;
    }

    //신착순 도서 조회
    @GetMapping("/new")
    public List<Book> findNewBook() {
        List<Book> book = bookService.findNewBook();
        return book;
    }

    //소설 장르 도서 조회
    @GetMapping("/fiction")
    public List<Book> findGenreFiction() {
        List<Book> book = bookService.findGenreFiction();
        return book;
    }

    //도서 키워드로 검색
    @GetMapping("/search")
    public List<Book> findBookByKeyword(@RequestParam String keyword) {
        // 키워드를 사용하여 도서를 검색하는 서비스 메서드를 호출
        List<Book> books = bookService.findBookByKeyword(keyword);
        return books;
    }

    //도서 찜 누르기
    @PostMapping("/like")
    public String likeBook(@RequestBody Book bookRequest) {
        try {
            int bookId = bookRequest.getBookId();
            bookService.increaseBookGood(bookId);
            return "찜 성공";
        } catch (Exception e) {
            return "에러";
        }

    }
}