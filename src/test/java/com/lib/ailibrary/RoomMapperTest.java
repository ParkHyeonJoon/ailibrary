package com.lib.ailibrary;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lib.ailibrary.domain.room.RoomMapper;
import com.lib.ailibrary.domain.room.RoomReserveRequest;
import com.lib.ailibrary.domain.room.RoomReserveResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class RoomMapperTest {

    @Autowired
    RoomMapper roomMapper;

    @Test
    void save() {
        RoomReserveRequest params = new RoomReserveRequest();
        params.setRoomName("스터디룸 1번");
        params.setRoomUserStuNum("20233562");
        params.setRoomUserName("김정환");
        params.setReservePeopleNum(4);
        params.setReserveDate("2023-08-10");
        params.setReserveTime("15:00~16:00");
        roomMapper.save(params);

        List<RoomReserveResponse> rooms = roomMapper.findAll();
        System.out.println("예약 정보 수는 : " + rooms.size() + "개 입니다.");
    }

    @Test
    void findById() {
        RoomReserveResponse room = roomMapper.findById(1L);
        try {
            String roomJson = new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(room);
            System.out.println(roomJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void delete() {
        System.out.println("삭제 이전의 전체 예약 개수는 : " + roomMapper.findAll().size() + "개입니다.");
        roomMapper.deleteById(1L);
        System.out.println("삭제 이후의 전체 예약 개수는 : " + roomMapper.findAll().size() + "개입니다.");
    }
}
