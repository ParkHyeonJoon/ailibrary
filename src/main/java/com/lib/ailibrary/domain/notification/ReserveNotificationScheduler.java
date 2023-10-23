package com.lib.ailibrary.domain.notification;

import com.lib.ailibrary.domain.book.BookLoanResponse;
import com.lib.ailibrary.domain.book.BookLoanService;
import com.lib.ailibrary.domain.book.BookReserveResponse;
import com.lib.ailibrary.domain.book.BookReserveService;
import com.lib.ailibrary.domain.room.RoomReserveResponse;
import com.lib.ailibrary.domain.room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReserveNotificationScheduler {

    private final RoomService roomService;
    private final NotificationService notificationService;

    private final BookLoanService bookLoanService;
    private final BookReserveService bookReserveService;

    @Scheduled(cron = "0 0 8 * * 1-6")
    public void checkReservations() {
        List<RoomReserveResponse> reservations = roomService.findAllReserve();

        LocalDate currentDate = LocalDate.now();

        for (RoomReserveResponse reservation : reservations) {
            LocalDateTime reserveDateTime = reservation.getRezDate().atStartOfDay();
            Duration duration = Duration.between(currentDate.atStartOfDay(), reserveDateTime);

            if (duration.toDays() == 0) {
                String roomName = getRoomName(reservation.getRoomId());
                String roomFloor = getRoomFloor(reservation.getRoomId());

                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(reservation.getUserStuId());
                params.setNotiContent("금일 " + reservation.getRezTime() + "에 " + roomFloor + " " + roomName + " 예약이 있습니다.");
                params.setNotiTime(LocalDateTime.now());

                notificationService.saveNotification(params);
            }
        }
    }

    private String getRoomName(int roomId) {
        String[] roomNames = {"1번 스터디룸", "2번 스터디룸", "3번 스터디룸", "1번 스터디룸", "2번 스터디룸", "3번 스터디룸",
                "1번 스터디룸", "2번스터디룸", "3번 스터디룸", "4번 스터디룸", "1번 스터디룸", "2번 스터디룸", "3번 스터디룸",
                "오디토리움", "VR룸"};
        return roomNames[roomId];
    }

    private String getRoomFloor(int roomId) {
        String[] roomFloors = {"2층", "2층", "2층", "3층", "3층", "3층", "4층", "4층", "4층", "4층", "5층", "5층", "5층", "5층", "5층"};
        return roomFloors[roomId];
    }

    //********반납날짜 하루 전 웹페이지에 알림 띄우기(수정 필요)*******
    @Scheduled(cron = "0 0 8 * * 1-6")
    public void checkBookLoan() {
        List<BookLoanResponse> responses = bookLoanService.findLoanAll();
        LocalDate currentDate = LocalDate.now();
        for(BookLoanResponse response : responses) {
            LocalDate returnDate = response.getReturnDate();
            Duration duration = Duration.between(currentDate, returnDate);

            if(duration.toDays() == 1) {
                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(response.getUserStuId());
                params.setNotiTime(LocalDateTime.now());
                params.setNotiContent(response.getBookTitle() + "을 내일"+"("+response.getReturnDate()+")"+"까지 반납해주세요.");

                notificationService.saveNotification(params);
            }
        }
    }

    //예약 유효기간 날짜 하루 전 웹페이지 알림 띄우기(수정 필요)
    @Scheduled(cron = "0 0 8 * * 1-6")
    public void checkBookReserve() {
        List<BookReserveResponse> responses = bookReserveService.findAllRez();
        LocalDate currentDate = LocalDate.now();
        for(BookReserveResponse response : responses) {
            LocalDate returnDate = response.getBookRezDate();
            Duration duration = Duration.between(currentDate, returnDate);

            if(duration.toDays() == 1) {
                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(response.getUserStuId());
                params.setNotiTime(LocalDateTime.now());
                params.setNotiContent(response.getBookTitle() + "을 내일"+"("+response.getBookDate()+")"+"까지 대출해주세요.");

                notificationService.saveNotification(params);
            }
        }
    }
}
