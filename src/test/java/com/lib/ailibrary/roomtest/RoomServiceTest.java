package com.lib.ailibrary.roomtest;

import com.lib.ailibrary.domain.room.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@SpringBootTest
public class RoomServiceTest {

    @Autowired
    RoomService roomService;

   /* @Test
    void save() {
        RoomReserveRequest params = new RoomReserveRequest();
        params.setRoomId(4);
        params.setUserStuId(20233562);
        params.setUserName("Junghwan");
        params.setRezPeopleNum(4);
        params.setRezDate(Date.valueOf("2023-08-28"));
        params.setRezTime("12:00~13:00");
        Long id = roomService.saveReserve(params);
        System.out.println("생성된 예약 ID : " + id);
    }*/

    @Test
    void 잔여시설조회() {
        RoomSearchRequest params = new RoomSearchRequest();
        params.setRoomType("스터디룸");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        /*try {
            params.setRezDate(dateFormat.parse("2023-09-05"));
        } catch (ParseException e) {
            e.printStackTrace();
        }*/

        /*params.setRezTime("20:00~21:00");*/

        /*String[] times = params.timeSplit();*/

        /*List<RoomSearchResponse> list = roomService.findRemainRoom(params.getRoomType(), params.getRezDate(), times);

        System.out.println(list.get(0).getRoomName());*/
    }
}
