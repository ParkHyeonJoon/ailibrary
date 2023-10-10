package com.lib.ailibrary.domain.notification;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NotificationMapper {

    /**
     * 알림 정보 저장
     * @param params - 알림 정보
     */
    void save(NotificationRequest params);

    /**
     * 알림 내역 조회
     * @param userStuId - 학번
     */
    List<NotificationResponse> findById(Long userStuId);
}
