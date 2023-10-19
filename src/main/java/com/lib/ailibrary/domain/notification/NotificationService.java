package com.lib.ailibrary.domain.notification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMapper notificationMapper;

    /**
     * 알림 정보 저장
     * @param params - 알림 정보
     */

    @Transactional
    public void saveNotification(NotificationRequest params) {
        notificationMapper.save(params);
    }

    /**
     * 알림 내역 조회 (삭제 되지 않은 알림)
     * @param userStuId - FK
     * @return 알림 내역
     */
    public List<NotificationResponse> findById(final Long userStuId) {
        return notificationMapper.findById(userStuId);
    }

    /**
     * 알림 내역 조회 (삭제 된 알림 포함)
     * @param userStuId - FK
     * @return 알림 내역
     */
    public List<NotificationResponse> findAllById(final Long userStuId) {return notificationMapper.findAllById(userStuId);}

    /**
     * 알림 삭제
     * @param notiId - PK
     */
    public void deleteNotification(final Long notiId) {
        notificationMapper.deleteById(notiId);
    }

    /**
     * 알림 개수 (삭제 되지 않은 알림)
     * @param userStuId - 학번 FK
     */
    public int notificationCount(final Long userStuId) {
        return notificationMapper.count(userStuId);
    }
}
