package com.lib.ailibrary.domain.room;

import lombok.Getter;
import lombok.ToString;

import java.sql.Date;

@Getter
public class RoomReserveResponse {

    private Long rezId;         // PK
    private int rezPeopleNum;   // 시설 사용인원
    private Date rezDate;       // 예약 날짜
    private String rezTime;     // 예약 시간
    private int roomId;         // 시설번호
    private int UserStuId;   // 예약자 학번
    private String UserName;    // 예약자 성명
}
