package com.lib.ailibrary.booktest;

import com.lib.ailibrary.domain.book.Book;
import com.lib.ailibrary.domain.book.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class BookServiceTest {

    @Autowired
    BookService bookService;

    @Test
    void findAll() {
        List<Book> bookList = bookService.findAllBook();
        for(Book book : bookList) {
            System.out.println(book.getBookTitle());
        }
    }
}
