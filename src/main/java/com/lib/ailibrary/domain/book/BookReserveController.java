package com.lib.ailibrary.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookReserveController {

    private final BookReserveService bookReserveService;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveBook(@RequestBody BookReserveRequest params) {
        try {
            bookReserveService.reserveBook(params);
            return ResponseEntity.ok("도서 예약이 완료되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/reserve/{bookRezId}")
    public ResponseEntity<BookReserveResponse> getReservationInfo(@PathVariable Long bookRezId) {
        BookReserveResponse reservationInfo = bookReserveService.getReservationInfo(bookRezId);
        if (reservationInfo != null) {
            return ResponseEntity.ok(reservationInfo);

        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

