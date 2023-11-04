package com.lib.ailibrary.domain.book;

import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookLoanController {

    private final BookLoanService bookLoanService;
    private final BookReserveService bookReserveService;
    private final NotificationService notificationService;
    private final BookService bookService;

    //대출 버튼 클릭
    @PostMapping("/loan")
    public ResponseEntity<String> LoanBook(@RequestBody BookLoanRequest request) {
        try {
            long userStuId = request.getUserStuId();
            int bookId = request.getBookId();
            //대출 내역에 존재하면 loanStatus가 1, 존재하지 않으면 0
            int loanStatus = bookLoanService.checkBookLoan(bookId);
            int loan = bookLoanService.checkBook(userStuId, bookId);
            int loanCount = bookLoanService.checkBookCount(userStuId);

            //대출하려는 도서가 예약이 되어있는 도서인지 확인
            Long whoReserve = bookReserveService.checkWhoReserve(bookId);

            //사용자가 대출 하지 않은 상태
            if(loan == 0) {
                //예약이 아예 안되어있거나, 예약이 되어있을 경우에는 사용자가 예약 해놓은 도서
                if (whoReserve == null) {
                    //다른 사용자도 대출 하지 않은 상태
                    if (loanStatus == 0) {
                        //아직 대출 가능한 상태
                        if(loanCount < 5) {
                            NotificationRequest notificationRequest = new NotificationRequest();
                            notificationRequest.setUserStuId(userStuId);
                            String bookTitle = bookService.reserveBookTitle(request.getBookId());
                            notificationRequest.setNotiContent(bookTitle + "대출이 완료되었습니다.");
                            notificationRequest.setNotiTime(LocalDateTime.now());
                            notificationService.saveNotification(notificationRequest);
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
                //예약이 있지만 사용자가 예약해놓은 도서일 경우
                else if(whoReserve.equals(userStuId)) {
                    if (loanStatus == 0) {
                        //아직 대출 가능한 상태
                        if(loanCount < 5) {
                            NotificationRequest notificationRequest = new NotificationRequest();
                            notificationRequest.setUserStuId(userStuId);
                            String bookTitle = bookService.reserveBookTitle(request.getBookId());
                            notificationRequest.setNotiContent(bookTitle + "이 대출 완료되었습니다.");
                            notificationRequest.setNotiTime(LocalDateTime.now());
                            notificationService.saveNotification(notificationRequest);
                            bookLoanService.saveLoan(request);
                            if(whoReserve.equals(userStuId)) {
                                bookReserveService.cancelAuto(bookId);
                            }
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
                else {
                    //다른 사용자가 예약 중인 상태
                    return ResponseEntity.ok("-2");
                }
            } else {
                //사용자가 대출해 반납해야 되는 상태
                NotificationRequest notificationRequest = new NotificationRequest();
                notificationRequest.setUserStuId(userStuId);
                String bookTitle2 = bookService.reserveBookTitle(request.getBookId());
                notificationRequest.setNotiContent(bookTitle2 + "이 반납 완료되었습니다.");
                notificationRequest.setNotiTime(LocalDateTime.now());
                notificationService.saveNotification(notificationRequest);
                bookLoanService.checkBookReturn(userStuId, bookId);
                String bookTitle = bookService.reserveBookTitle(bookId);

                List<BookReserveResponse> responses = bookReserveService.findAllRez();
                for(BookReserveResponse response : responses) {
                    if(response.getBookId() == bookId) {
                        NotificationRequest notirequest2 = new NotificationRequest();
                        notirequest2.setNotiContent("예약하신 " + bookTitle + " 도서가 반납되었습니다.");
                        notirequest2.setUserStuId(response.getUserStuId());
                        notirequest2.setNotiTime(LocalDateTime.now());
                        notificationService.saveNotification(notirequest2);
                    }
                }

                return ResponseEntity.ok("1");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //화면 들어가자마자 대출 여부 확인
    @GetMapping("/loan")
    public ResponseEntity<String> checkLoan(@RequestParam long userStuId, @RequestParam int bookId) {
        try {
            int loanStatus = bookLoanService.checkBookLoan(bookId);
            int loan = bookLoanService.checkBook(userStuId, bookId);

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

    //사용자가 현재 대출 중인 도서 목록
    @GetMapping("/loaning")
    public List<BookLoanResponse> checkBookLoaning(@RequestParam long userStuId) {
        List<BookLoanResponse> loaningBook = bookLoanService.checkBookLoaning(userStuId);
        return loaningBook;

    }

}
