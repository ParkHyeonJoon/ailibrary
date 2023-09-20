package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookLoanController {

    private final BookLoanService bookLoanService;

    @PostMapping("/loan")
    public ResponseEntity<String> LoanBook(@RequestBody BookLoanRequest request) {
        try {
            bookLoanService.LoanBook(request);
            return ResponseEntity.ok("도서 대출이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
