package com.lib.ailibrary.domain.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/notification/list")
    public List<NotificationResponse> getNotification(@RequestBody final Long userStuId) {

        List<NotificationResponse> notiResponses = notificationService.findById(userStuId);
        for(int i=0; i<notiResponses.size(); i++) {
            notiResponses.get(i).getDaysBetweenNotificationAndCurrentTime();
        }

        return notiResponses;
    }

    @PutMapping("/notification/delete")
    public String deleteNotification(@RequestBody final Long notiId) {
        notificationService.deleteNotification(notiId);

        return "삭제가 완료되었습니다.";
    }

    @PostMapping("/notification/count")
    public int notificationCount(@RequestBody final Long userStuId) {
        return notificationService.notificationCount(userStuId);
    }
}
