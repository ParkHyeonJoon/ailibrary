package com.lib.ailibrary.domain.notification;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class NotificationResponse {
    private Long notiId; // 알림 번호
    private Long userStuId; // 학번
    private String notiContent; // 알림 내용
    private LocalDateTime notiTime; // 알림 등록 시간
    private boolean leadCheck; // 알림 열람 여부
    private String dateMessage; // 날짜메시지 ex) 1일전, 5분전 등

    // 알림 등록 시간 처리
    public void getDaysBetweenNotificationAndCurrentTime() {
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(notiTime, currentTime);

        if(duration.toDays() >= 7) {
            // 일주일 이상 지난 경우
            dateMessage = notiTime.format(DateTimeFormatter.ofPattern("MM월-dd일"));
        } else if (duration.toDays() >= 1) {
            // 일주일 전
            dateMessage = duration.toDays() + "일 전";
        } else if (duration.toHours() >= 1) {
            // 하루 전
            dateMessage = duration.toHours() + "시간 전";
        } else if (duration.toMinutes() >= 5) {
            // 한 시간 전
            dateMessage = duration.toMinutes() + "분 전";
        } else {
            // 5분 전
            dateMessage = "방금 전";
        }
    }


}
