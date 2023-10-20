package com.lib.ailibrary.domain.notification;

import com.lib.ailibrary.domain.room.RoomReserveResponse;
import com.lib.ailibrary.domain.room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Component
@RequiredArgsConstructor
public class ReserveNotificationScheduler {

    private final RoomService roomService;
    private final NotificationService notificationService;

    @Scheduled(cron = "0 0 8 * * ?") // 매일 오전 8시에 실행 fixedRate = 60000 cron = "0 0 8 * * ?"
    public void sendNotifications() {
        LocalDate today = LocalDate.now();
        List<RoomReserveResponse> reservations = roomService.findAllReserveToday(today);

        Map<Long, List<RoomReserveResponse>> userReservationsMap = new HashMap<>();

        for (RoomReserveResponse reservation : reservations) {
            Long userStuId = reservation.getUserStuId();

            if (userReservationsMap.containsKey(userStuId)) {
                List<RoomReserveResponse> userReservations = userReservationsMap.get(userStuId);
                userReservations.add(reservation);
            } else {
                List<RoomReserveResponse> userReservations = new ArrayList<>();
                userReservations.add(reservation);
                userReservationsMap.put(userStuId, userReservations);
            }
        }

        for (Map.Entry<Long, List<RoomReserveResponse>> entry : userReservationsMap.entrySet()) {
            Long userStuId = entry.getKey();
            List<RoomReserveResponse> userReservations = entry.getValue();

            StringBuilder notificationContent = new StringBuilder();

            for (RoomReserveResponse reservation : userReservations) {
                String roomName = getRoomName(reservation.getRoomId());
                String roomFloor = getRoomFloor(reservation.getRoomId());

                notificationContent.append(roomFloor).append(" ").append(roomName).append(" 예약: ").append(reservation.getRezTime()).append("\n");
            }

            NotificationRequest params = new NotificationRequest();
            params.setUserStuId(userStuId);
            params.setNotiContent("금일 예약된 내용입니다.\n" + notificationContent.toString());
            params.setNotiTime(LocalDateTime.now());

            notificationService.saveNotification(params);
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




