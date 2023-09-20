package com.lib.ailibrary.domain.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public List<Book> findAllBook() {
        List<Book> book = bookService.findAllBook();
        return book;
    }

    @GetMapping("/{bookId}")
    public Book findBookById(@PathVariable int bookId) {
        Book book = bookService.findBookById(bookId);
        return book;
    }

    @GetMapping("/search")
    public List<Book> findBookByKeyword(@RequestParam String keyword) {
        // 키워드를 사용하여 도서를 검색하는 서비스 메서드를 호출
        List<Book> books = bookService.findBookByKeyword(keyword);
        return books;
    }
}
