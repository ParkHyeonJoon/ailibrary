package com.lib.ailibrary.notificationtest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lib.ailibrary.domain.notification.NotificationMapper;
import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class NotificationMapperTest {

    @Autowired
    NotificationMapper notificationMapper;

    @Test
    void 알림정보저장() {
        NotificationRequest params = new NotificationRequest();
        params.setUserStuId(20233562L);
        params.setNotiContent("알림이 저장되었습니다.");
        params.setNotiTime(LocalDateTime.now());

        notificationMapper.save(params);
    }

    @Test
    void 알림내역출력() {
        List<NotificationResponse> result = notificationMapper.findById(20233562L);

        for(int i=0; i<result.size(); i++) {
            result.get(i).getDaysBetweenNotificationAndCurrentTime();
            try {
                String roomJson = new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(result.get(i));
                System.out.println(roomJson);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
