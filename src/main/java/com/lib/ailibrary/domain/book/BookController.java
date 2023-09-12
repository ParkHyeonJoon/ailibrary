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
}
