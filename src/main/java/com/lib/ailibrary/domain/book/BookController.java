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

    private static final Logger logger = LoggerFactory.getLogger(BookController.class);

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
    public ResponseEntity<Integer> likeBook(@RequestBody BookLikeRequest request) {
        try {
            String userId = request.getUserId();
            int bookId = request.getBookId();

            int likeStatus = bookService.checkUserLikeBook(userId, bookId);

            if(likeStatus == 0) {
                bookService.likeBook(userId, bookId);
                return ResponseEntity.ok(1); //찜 성공을 의미
            } else if (likeStatus == 1) {
                bookService.unlikeBook(userId, bookId);
                return ResponseEntity.ok(0); //찜 해제를 의미
            } else {
                return ResponseEntity.ok(-1); //다른 상황
            }
        } catch (Exception e) {
            logger.error("예외 발생: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(-1);
        }
    }

    //BookInfo 들어가자마자 찜 되어있는지 확인하기.
    @GetMapping("/checkLike")
    public ResponseEntity<String> checkLikeBook(@RequestParam String userId, @RequestParam int bookId) {
        try {

            int likeStatus = bookService.checkUserLikeBook(userId, bookId);

            if(likeStatus == 0) {
                //bookService.likeBook(userId, bookId);
                return ResponseEntity.ok("off"); //찜이 안 되어있다는 것을 의미
            } else if (likeStatus == 1) {
                //bookService.unlikeBook(userId, bookId);
                return ResponseEntity.ok("on"); //찜이 되어있다는 것을 의미
            } else {
                return ResponseEntity.ok("Fuck no"); //다른 상황
            }
        } catch (Exception e) {
            logger.error("예외 발생: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error");
        }
    }
}