package com.lib.ailibrary.domain.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/notification/list")
    public List<NotificationResponse> getNotification(@RequestParam final Long userStuId) {

        List<NotificationResponse> notiResponses = notificationService.findById(userStuId);
        for(int i=0; i<notiResponses.size(); i++) {
            notiResponses.get(i).getDaysBetweenNotificationAndCurrentTime();
        }

        return notiResponses;
    }
}
