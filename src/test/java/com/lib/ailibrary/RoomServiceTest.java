package com.lib.ailibrary;

import com.lib.ailibrary.domain.room.RoomMapper;
import com.lib.ailibrary.domain.room.RoomReserveRequest;
import com.lib.ailibrary.domain.room.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RoomServiceTest {

    @Autowired
    RoomService roomService;

    @Test
    void save() {
        RoomReserveRequest params = new RoomReserveRequest();
        params.setRoomName("3층 스터디룸1");
        params.setRoomUserStuNum("20233562");
        params.setRoomUserName("Junghwan");
        params.setReservePeopleNum(4);
        params.setReserveDate("2023-08-28");
        params.setReserveTime("12:00~13:00");
        Long id = roomService.saveReserve(params);
        System.out.println("생성된 예약 ID : " + id);
    }
}
