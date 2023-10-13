package com.lib.ailibrary.domain.notification;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {

    /**
     * 알림 정보 저장
     * @param params - 알림 정보
     */
    void save(final NotificationRequest params);

    /**
     * 알림 내역 조회 (삭제 되지 않은 알림)
     * @param userStuId - 학번
     */
    List<NotificationResponse> findById(final Long userStuId);

    /**
     * 알림 내역 조회 (삭제 된 알림 포함)
     * @param userStuId - 학번
     */
    List<NotificationResponse> findAllById(final Long userStuId);

    /**
     * 알림 삭제
     * @param notiId - PK
     */
    void deleteById(final Long notiId);

    /**
     * 알림 개수
     * @param userStuId - 학번 FK
     */
    int count(final Long userStuId);
}
