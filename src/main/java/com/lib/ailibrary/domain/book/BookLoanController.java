package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
            //대출 내역에 존재하면 loanStatus가 1, 존재하지 않으면 0
            int loanStatus = bookLoanService.checkBookLoan(bookId);
            if (loanStatus == 0) {
                bookLoanService.saveLoan(request);
                return ResponseEntity.ok("0");
            } else {
                return ResponseEntity.ok("1");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/loan")
    public ResponseEntity<String> checkLoan(@RequestParam String userId, @RequestParam int bookId) {
        try {
            int loanStatus = bookLoanService.checkBookLoan(bookId);

            if (loanStatus == 0) {
                return ResponseEntity.ok("able");
            } else {
                return ResponseEntity.ok("unable");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error");
        }
    }
}
