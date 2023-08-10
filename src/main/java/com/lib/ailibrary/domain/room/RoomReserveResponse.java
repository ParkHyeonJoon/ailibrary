package com.lib.ailibrary.domain.room;

import lombok.Getter;

@Getter
public class RoomReserveResponse {

    private Long roomReserveId;     // PK
    private String roomName;        // 시설명
    private String roomUserStuNum;  // 예약자 학번
    private String roomUserName;    // 예약자 성명
    private int reservePeopleNum;   // 시설 사용인원
    private String reserveDate;     // 예약 날짜
    private String reserveTime;     // 예약 시간
}
