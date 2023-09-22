package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookLoanController {

    private final BookLoanService bookLoanService;

    @PostMapping("/loan")
    public ResponseEntity<String> LoanBook(@RequestBody BookLoanRequest request) {
        try {
            int bookId = request.getBookId();
            int LoanStatus = bookLoanService.checkBookLoan(bookId);
            if(LoanStatus == 0 || request.getReturnDate().isBefore(LocalDate.now())) {
                bookLoanService.saveLoan(request);
                return ResponseEntity.ok("도서 대출이 완료되었습니다.");
            } else {
                return ResponseEntity.ok("도서가 대출 중");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
