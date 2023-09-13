package com.lib.ailibrary;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.lib.ailibrary.domain.room.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SpringBootTest
public class RoomMapperTest {

    @Autowired
    RoomMapper roomMapper;

   /* @Test
    void save() {
        RoomReserveRequest params = new RoomReserveRequest();
        params.setRoomId(1);
        params.setUserStuId(20233562);
        params.setUserName("김정환");
        params.setRezPeopleNum(4);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            params.setRezDate(dateFormat.parse("2023-09-05"));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        params.setRezTime("16:00~17:00");
        roomMapper.save(params);

        List<RoomReserveResponse> rooms = roomMapper.findAll();
        System.out.println("예약 정보 수는 : " + rooms.size() + "개 입니다.");
    }*/

    @Test
    void findById() {
        RoomReserveResponse room = roomMapper.findById(2L);
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

    @Test
    void 잔여시설조회() {
        RoomSearchRequest params = new RoomSearchRequest();
        params.setRoomType("스터디룸");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

       /* try {
            params.setRezDate(dateFormat.parse("2023-09-05"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        params.setRezTime("20:00~21:00");*/

        String[] times = params.timeSplit();

        /*List<RoomSearchResponse> remainRoom = roomMapper.searchRoom(params.getRoomType(), params.getRezDate(), times);

        for(int i=0; i<remainRoom.size(); i++) {
            System.out.println(remainRoom.get(i).getRoomName());
        }*/
    }
}
