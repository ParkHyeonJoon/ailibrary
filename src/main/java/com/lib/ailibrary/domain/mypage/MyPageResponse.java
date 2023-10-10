package com.lib.ailibrary.domain.mypage;

import com.lib.ailibrary.domain.notification.NotificationResponse;
import com.lib.ailibrary.domain.room.RoomReserveResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter     // Getter가 있어야 RestController가 자동으로 JSON으로 변환 시켜줌
@Setter
public class MyPageResponse {

    // 알림 정보
    List<NotificationResponse> notificationResponses;

    // 시설 예약 정보
    List<RoomReserveResponse> roomReserveResponses;

}
