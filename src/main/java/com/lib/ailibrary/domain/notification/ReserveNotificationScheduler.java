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

    @Scheduled(cron = "0 0 8 * * 1-6") // 매일 8시에 실행 ( 토요일은 제외 )
    public void checkReservations() {
        List<RoomReserveResponse> result = roomService.findAllReserve();
        LocalDate currentDate = LocalDate.now();
        Duration duration;
        for(int i=0; i< result.size(); i++) {
            LocalDateTime reserveDateTime = result.get(i).getRezDate().atStartOfDay();
            duration = Duration.between(currentDate.atStartOfDay(), reserveDateTime);
            if(duration.toDays() == 1) {
                NotificationRequest params = new NotificationRequest();
                params.setUserStuId(result.get(i).getUserStuId());
                if(result.get(i).getRoomId() <= 13) {
                    params.setNotiContent("스터디룸 이용 예약 날짜가 하루 남았습니다..");
                } else if(result.get(i).getRoomId() == 14) {
                    params.setNotiContent("오디토리움 이용 예약 날짜가 하루 남았습니다.");
                } else
                    params.setNotiContent("VR룸 이용 예약 날짜가 하루 남았습니다.");
                params.setNotiTime(LocalDateTime.now());
                notificationService.saveNotification(params);
            }
        }
    }
}
