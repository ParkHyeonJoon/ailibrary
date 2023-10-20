package com.lib.ailibrary.domain.book;

import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookReserveController {

    private final BookReserveService bookReserveService;
    private final BookLoanService bookLoanService;
    private final NotificationService notificationService;

    //예약 버튼을 클릭하면 실행
    @PostMapping("/reserve")
    public ResponseEntity<String> reserveBook(@RequestBody BookReserveRequest request) {
        String userId = request.getUserId();
        int bookId = request.getBookId();

        int loanStatus = bookLoanService.checkBookLoan(bookId);
        int loan = bookLoanService.checkBook(userId, bookId);

        //reserveStatus가 0이면 예약 가능, 그 외면 예약 불가능
        int reserveStatus = bookReserveService.checkReserve(bookId);

        // 사용자가 대출 하지 않은 상태
        if(loan == 0) {
            // 다른 사용자가 대출 한 상태
            if(loanStatus == 1) {
                // 예약 하지 않은 상태
                if(reserveStatus == 0) {
                    NotificationRequest notificationRequest = new NotificationRequest();
                    notificationRequest.setUserStuId(request.getUserStuId());
                    notificationRequest.setNotiContent("도서 예약이 완료되었습니다.");
                    notificationRequest.setNotiTime(LocalDateTime.now());
                    notificationService.saveNotification(notificationRequest);
                    bookReserveService.reserveBook(request);
                    return ResponseEntity.ok("예약 성공");
                } else {
                    return ResponseEntity.ok("이미 예약");
                }
            }
            // 아무도 대출 하지 않은 상태
            else {
                return ResponseEntity.ok("예약 불가능");
            }
        }
        //사용자가 대출 한 상태
        else {
            return ResponseEntity.ok("대출");
        }
    }

    //화면에 들어갔을 때
    @GetMapping("/reserve")
    public ResponseEntity<String> checkAndReserve(int bookId) {
        int reserveStatus = bookReserveService.checkReserve(bookId);

        if(reserveStatus == 1) {
            // 예약 중인 도서
            return ResponseEntity.ok("예약 도서");
        }
        // 예약이 안되어있는 도서
        else {
            return ResponseEntity.ok("그냥 도서");
        }
    }

    //사용자 예약 도서 조회
    @GetMapping("/reserving")
    public List<BookReserveResponse> reserveBook(String userId) {
        List<BookReserveResponse> reserveBookList = bookReserveService.checkBookReserve(userId);
        return reserveBookList;
    }

    //사용자 예약 도서 취소
    @PostMapping("/Reserving")
    public void cancelReserve(@RequestBody CancelResponse request) {
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setUserStuId(request.getUserStuId());
        notificationRequest.setNotiContent("도서 예약취소가 완료되었습니다.");
        notificationRequest.setNotiTime(LocalDateTime.now());
        notificationService.saveNotification(notificationRequest);
        bookReserveService.cancelReserve(request.getBookId());
    }
}

