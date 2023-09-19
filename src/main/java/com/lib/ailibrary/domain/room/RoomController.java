package com.lib.ailibrary.domain.room;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // 잔여 시설 검색
    @GetMapping("reserve/search")
    public List<RoomSearchResponse> searchRoom(@RequestBody final RoomSearchRequest params) {
        /*String[] times = params.timeSplit();
        List<RoomSearchResponse> list = roomService.findRemainRoom(params.getRoomType(), params.getRezDate(), times);*/

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
