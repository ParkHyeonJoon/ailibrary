package com.lib.ailibrary.domain.notification;

import com.lib.ailibrary.domain.room.RoomReserveResponse;
import com.lib.ailibrary.domain.room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReserveNotificationScheduler {

    private final RoomService roomService;
    private final NotificationService notificationService;

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
}
