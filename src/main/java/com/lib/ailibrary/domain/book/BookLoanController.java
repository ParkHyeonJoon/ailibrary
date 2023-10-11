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

    //대출 버튼 클릭
    @PostMapping("/loan")
    public ResponseEntity<String> LoanBook(@RequestBody BookLoanRequest request) {
        try {
            String userId = request.getUserId();
            int bookId = request.getBookId();
            //대출 내역에 존재하면 loanStatus가 1, 존재하지 않으면 0
            int loanStatus = bookLoanService.checkBookLoan(bookId);
            int loan = bookLoanService.checkBook(userId, bookId);
            int loanCount = bookLoanService.checkBookCount(userId);

            //사용자가 대출 하지 않은 상태
            if (loan == 0) {
                //다른 사용자도 대출 하지 않은 상태
                if (loanStatus == 0) {
                    //아직 대출 가능한 상태
                    if(loanCount < 5) {
                        bookLoanService.saveLoan(request);
                        return ResponseEntity.ok("0");
                    }
                    //5권 대출해서 대출 불가능한 상태
                    else {
                        return ResponseEntity.ok("99");
                    }
                }
                //다른 사용자가 대출 중인 상태
                else {
                    return ResponseEntity.ok("-1");
                }
            }
            //사용자가 대출해 반납해야 되는 상태
            else {
                bookLoanService.checkBookReturn(userId, bookId);
                return ResponseEntity.ok("1");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //화면 들어가자마자 대출 여부 확인
    @GetMapping("/loan")
    public ResponseEntity<String> checkLoan(@RequestParam String userId, @RequestParam int bookId) {
        try {
            int loanStatus = bookLoanService.checkBookLoan(bookId);
            int loan = bookLoanService.checkBook(userId, bookId);

            if(loan == 0) {
                if(loanStatus == 0) {
                    //대출 가능
                    return ResponseEntity.ok("able");
                } else {
                    //대출 중
                    return ResponseEntity.ok("unable");
                }
            } else {
                //반납하기
                return ResponseEntity.ok("return");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error");
        }
    }
}
