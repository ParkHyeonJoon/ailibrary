package com.lib.ailibrary.domain.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", exposedHeaders = "Authorization")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/notification/list") // 삭제 되지 않은 알림 내역
    public List<NotificationResponse> getNotification(@RequestBody final Long userStuId) {

        List<NotificationResponse> notiResponses = notificationService.findById(userStuId);
        for(int i=0; i<notiResponses.size(); i++) {
            notiResponses.get(i).getDaysBetweenNotificationAndCurrentTime();
        }

        return notiResponses;
    }

    @PostMapping("/notification/alllist") // 삭제 된 알림 포함 내역
    public List<NotificationResponse> getAllNotification(@RequestBody final Long userStuId) {

        List<NotificationResponse> notiResponses = notificationService.findAllById(userStuId);
        for(int i=0; i<notiResponses.size(); i++) {
            notiResponses.get(i).getDaysBetweenNotificationAndCurrentTime();
        }

        return notiResponses;
    }

    @PutMapping("/notification/delete") // 알림 삭제 read_check(읽음 여부) = 1로 변경
    public String deleteNotification(@RequestBody final Long notiId) {
        notificationService.deleteNotification(notiId);

        return "삭제가 완료되었습니다.";
    }

    @PostMapping("/notification/count") // 삭제 되지 않은 알림 개수 출력
    public int notificationCount(@RequestBody final Long userStuId) {
        return notificationService.notificationCount(userStuId);
    }
}
