package com.lib.ailibrary.domain.notification;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationRequest {
    private Long notiId; // 알림 번호
    private Long userStuId; // 학번
    private String notiContent; // 알림 내용
    private LocalDateTime notiTime; // 알림 등록 시간
}
