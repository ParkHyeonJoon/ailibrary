package com.lib.ailibrary.BookTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lib.ailibrary.domain.book.Book;
import com.lib.ailibrary.domain.book.BookMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.SQLOutput;
import java.util.List;

@SpringBootTest
public class BookMapperTest {

    @Autowired
    BookMapper bookMapper;

    @Test
    void findByTitle() {
        Book book = bookMapper.findByTitle("변신");
        System.out.println("변신 작가는 : " + book.getAuthor());

    }

    @Test
    void findNew() {
        List<Book> newBook = bookMapper.findNew();
        for (Book book : newBook) {
            System.out.println(book.getBookTitle());
            System.out.println(book.getBookDate());
        }
    }

    @Test
    void findGood() {
        List<Book> goodBook = bookMapper.findGood();
        for (Book book : goodBook) {
            System.out.println(book.getBookTitle());
            System.out.println(book.getBookGood());
        }
    }

    @Test
    void findAll() {
        List<Book> allBook = bookMapper.findAll();

        for (Book book : allBook) {
            System.out.println(book.getBookTitle()); //도서의 제목을 출력 예시
            System.out.println(book.getAuthor()); //작가 이름을 출력 예시
            System.out.println(book.getBookGood());
        }
    }
}
