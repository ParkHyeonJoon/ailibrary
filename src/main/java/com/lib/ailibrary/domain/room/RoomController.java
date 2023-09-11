package com.lib.ailibrary.domain.room;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // 잔여 시설 검색
    @GetMapping("reserve/search.do")
    public List<RoomSearchResponse> searchRoom(final RoomSearchRequest params) {
        return roomService.findRemainRoom(params);
    }

    // 신규 예약 생성
    @PostMapping("/reserve/save.do")
    public String saveReserve(final RoomReserveRequest params) {
        roomService.saveReserve(params);
        return "";     // 미완성
    }
}
