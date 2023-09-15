package com.lib.ailibrary.domain.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class RoomReserveRequest {

    private Long rezId;         // PK
    private int rezPeopleNum;   // 시설 사용인원

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rezDate;       // 예약 날짜

    private String rezTime;     // 예약 시간
    private int roomId;         // 시설번호
    private int userStuId;   // 예약자 학번
    private String userName;    // 예약자 성명

    public String[] timeSplit() {
        String[] times = rezTime.split("\\s");
        return times;
    }



}
