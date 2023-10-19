package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookReserveController {

    private final BookReserveService bookReserveService;
    private final BookLoanService bookLoanService;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveBook(@RequestBody BookReserveRequest request) {
        String userId = request.getUserId();
        int bookId = request.getBookId();

        // 1. 사용자가 대출 중인 도서인지 확인
        int loan = bookLoanService.checkBook(userId, bookId);

        if (loan > 0) {
            // 2. 본인이 대출 중
            return ResponseEntity.ok("대출 중");
        }

        // 3. 본인이 대출 안 함 다른 사용자 대출 중인지 확인
        int loanStatus = bookLoanService.checkBookLoan(bookId);

        if (loanStatus == 1) {
            // 4. 본인이 대출 안 하고 다른 사용자가 대출 중
            int reserveStatus = bookReserveService.checkReserve(bookId);
            // 다른 사용자가 예약중인지 확인
            if (reserveStatus == 1) {
                // 5. 다른 사용자가 대출 중이고 다른 사용자가 예약 중
                return ResponseEntity.ok("예약 중");
            } else {
                // 6. 다른 사용자가 대출 중이고 다른 사용자가 예약 안 함
                bookReserveService.reserveBook(request);
                return ResponseEntity.ok("예약 가능");
            }
        }

        // 7. 대출 중이 아니고 다른 사용자도 대출 중이 아님
        bookReserveService.reserveBook(request);
        return ResponseEntity.ok("예약 불가");
    }

    @GetMapping("/reserve")
    public ResponseEntity<String> checkAndReserve(@RequestParam int bookId, @RequestParam String userId) {
        // 1. 사용자가 대출 중인 도서인지 확인
        int loan = bookLoanService.checkBook(userId, bookId);

        if (loan > 0) {
            // 2. 본인이 대출 중
            return ResponseEntity.ok("대출 중");
        }

        // 3. 본인이 대출 안 함 다른 사용자 대출 중인지 확인
        int loanStatus = bookLoanService.checkBookLoan(bookId);

        if (loanStatus == 1) {
            // 4. 본인이 대출 안 하고 다른 사용자가 대출 중
            int reserveStatus = bookReserveService.checkReserve(bookId);
            // 다른 사용자가 예약중인지 확인
            if (reserveStatus == 1) {
                // 5. 다른 사용자가 대출 중이고 다른 사용자가 예약 중
                return ResponseEntity.ok("예약 중");
            } else {
                // 6. 다른 사용자가 대출 중이고 다른 사용자가 예약 안 함
                bookReserveService.reserveBook(new BookReserveRequest(userId, bookId)); // 예약 진행
                return ResponseEntity.ok("예약 가능");
            }
        }

        // 7. 대출 중이 아니고 다른 사용자도 대출 중이 아님
        bookReserveService.reserveBook(new BookReserveRequest(userId, bookId)); // 예약 진행
        return ResponseEntity.ok("예약 불가");
    }


    @GetMapping("/reserving")
    public List<BookReserveResponse> reserveBook(@RequestParam String userId) {
        List<BookReserveResponse> reserveBookList = bookReserveService.checkBookReserve(userId);
        return reserveBookList;
    }

    // ... (다른 메소드들은 그대로 유지)
}
