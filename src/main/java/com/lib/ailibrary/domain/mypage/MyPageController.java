package com.lib.ailibrary.domain.mypage;

import com.lib.ailibrary.domain.notification.NotificationResponse;
import com.lib.ailibrary.domain.notification.NotificationService;
import com.lib.ailibrary.domain.room.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MyPageController {

    private final NotificationService notificationService;
    private final RoomService roomService;

    @GetMapping("/mypage")
    public MyPageResponse mypage(@RequestParam final Long userStuId) {
        MyPageResponse myPageResponse = new MyPageResponse();

        List<NotificationResponse> notiResponses = notificationService.findById(userStuId);
        for(int i=0; i<notiResponses.size(); i++) {
            notiResponses.get(i).getDaysBetweenNotificationAndCurrentTime();
        }

        myPageResponse.setNotificationResponses(notiResponses);
        myPageResponse.setRoomReserveResponses(roomService.findRezById(userStuId));

        return myPageResponse;
    }
}
