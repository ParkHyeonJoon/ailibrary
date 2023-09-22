package com.lib.ailibrary.domain.room;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", exposedHeaders = "Authorization")
public class RoomController {

    private final RoomService roomService;

    // 잔여 시설 검색
    @GetMapping("reserve/search")
    public List<RoomSearchResponse> searchRoom(
            @RequestParam String roomType,
            @RequestParam String rezDate,
            @RequestParam String[] rezTime) {
        RoomSearchRequest params = new RoomSearchRequest();
        params.setRoomType(roomType);
        params.setRezDate((LocalDateTime.parse(rezDate, DateTimeFormatter.ISO_DATE_TIME)).toLocalDate());
        params.setRezTime(rezTime);
        List<RoomSearchResponse> resultList = roomService.findRemainRoom(params);
        return resultList;
    }

    // 신규 예약 생성
    @PostMapping("/reserve/save")
    public String saveReserve(@RequestBody final RoomReserveRequest params) {

        for(int i=0; i<params.getRezTime().length; i++) {
            RoomReserveSaveRequest result = new RoomReserveSaveRequest();
            result.setRezPeopleNum(params.getRezPeopleNum());
            result.setRezDate(params.getRezDate());
            result.setRoomId(params.getRoomId());
            result.setUserStuId(params.getUserStuId());
            result.setUserName(params.getUserName());
            result.setRezTime(params.getRezTime()[i]);
            roomService.saveReserve(result);
        }
        return "잘됐슈";     // 미완성
    }
}
