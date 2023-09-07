package com.lib.ailibrary;

import com.lib.ailibrary.domain.room.RoomMapper;
import com.lib.ailibrary.domain.room.RoomReserveRequest;
import com.lib.ailibrary.domain.room.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;

@SpringBootTest
public class RoomServiceTest {

    @Autowired
    RoomService roomService;

    @Test
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
    }
}
