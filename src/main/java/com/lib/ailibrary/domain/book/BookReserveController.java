package com.lib.ailibrary.domain.book;

import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    private final BookService bookService;

    //예약 버튼을 클릭하면 실행
    @PostMapping("/reserve")
    public ResponseEntity<String> reserveBook(@RequestBody BookReserveRequest request) {
        long userStuId = request.getUserStuId();
        int bookId = request.getBookId();

        int loanStatus = bookLoanService.checkBookLoan(bookId);
        int loan = bookLoanService.checkBook(userStuId, bookId);

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
                    String bookTitle = bookService.reserveBookTitle(request.getBookId());
                    notificationRequest.setNotiContent(bookTitle + "이(가) 예약 완료되었습니다.");
                    notificationRequest.setNotiTime(LocalDateTime.now());
                    notificationService.saveNotification(notificationRequest);
                    bookReserveService.reserveBook(request);
                    return ResponseEntity.ok("예약 가능");
                } else {
                    return ResponseEntity.ok("예약 중");
                }
            }
            // 아무도 대출 하지 않은 상태
            else {
                return ResponseEntity.ok("예약 불가");
            }
        }
        //사용자가 대출 한 상태
        else {
            return ResponseEntity.ok("대출 중");
        }
    }

    //화면에 들어갔을 때
    @GetMapping("/reserve")
    public ResponseEntity<String> checkAndReserve(int bookId, long userStuId) {

        int loanStatus = bookLoanService.checkBookLoan(bookId);
        int loan = bookLoanService.checkBook(userStuId, bookId);
        int reserveStatus = bookReserveService.checkReserve(bookId);

        if(loan == 0) {
            // 다른 사용자가 대출 한 상태
            if(loanStatus == 1) {
                // 예약 하지 않은 상태
                if(reserveStatus == 0) {
                    return ResponseEntity.ok("예약 가능");
                } else {
                    return ResponseEntity.ok("예약 중");
                }
            }
            // 아무도 대출 하지 않은 상태
            else {
                return ResponseEntity.ok("예약 불가");
            }
        }
        //사용자가 대출 한 상태
        else {
            return ResponseEntity.ok("대출 중");
        }
    }

    //사용자 예약 도서 조회
    @GetMapping("/reserving")
    public List<BookReserveResponse> reserveBook(long userStuId) {
        List<BookReserveResponse> reserveBookList = bookReserveService.checkBookReserve(userStuId);
        return reserveBookList;
    }

    //사용자 예약 도서 취소
    @PostMapping("/Reserving")
    public void cancelReserve(@RequestBody CancelResponse request) {
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setUserStuId(request.getUserStuId());
        notificationRequest.setNotiContent(request.getBookTitle() + "이(가) 예약 취소되었습니다.");
        notificationRequest.setNotiTime(LocalDateTime.now());
        notificationService.saveNotification(notificationRequest);
        bookReserveService.cancelReserve(request.getBookId());
    }

    //예약 유효 날짜 지나면 도서 자동 취소
    @Scheduled(cron = "0 0 8 * * MON-FRI")
    public void autoReserveCancel() {
        List<BookReserveResponse> responses = bookReserveService.findAllRez();
        LocalDate currentDate = LocalDate.now();

        for(BookReserveResponse response : responses) {
            LocalDate rezDate = response.getBookRezDate();
            //rezDate.isAfter(currentDate) currentDate.isAfter(rezDate)
            //오늘 날짜 보다 예약 유효 날짜가 더 지났을 때.
            if(currentDate.isAfter(rezDate)) {
                bookReserveService.cancelAuto(response.getBookId());
                NotificationRequest notificationRequest = new NotificationRequest();
                notificationRequest.setUserStuId(response.getUserStuId());
                notificationRequest.setNotiTime(LocalDateTime.now());
                notificationRequest.setNotiContent(response.getBookTitle() + "이(가) 예약 유효날짜가 지나 자동 취소되었습니다.");
                notificationService.saveNotification(notificationRequest);
            }
        }
    }
}

