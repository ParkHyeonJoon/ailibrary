package com.lib.ailibrary.domain.room;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // 잔여 시설 검색
    @GetMapping("reserve/search")
    public List<RoomSearchResponse> searchRoom(@RequestBody final RoomSearchRequest params) {
        String[] times = params.timeSplit();
        List<RoomSearchResponse> list = roomService.findRemainRoom(params.getRoomType(), params.getRezDate(), times);

        return list;
    }

    // 신규 예약 생성
    @PostMapping("/reserve/save")
    public String saveReserve(@RequestBody final RoomReserveRequest params) {
        String[] times = params.timeSplit();
        for(int i=0; i< times.length; i++) {
            params.setRezTime(times[i]);
            if(i > 0)    // 처음에는 NULL 값이기 때문에 조건 지정
                params.setRezId(params.getRezId()+i);
            roomService.saveReserve(params);
        }
        return "잘됐슈";     // 미완성
    }
}
