package com.lib.ailibrary.domain.room;

import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationService;
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
    private final NotificationService notificationService;

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

        NotificationRequest notificationRequest = new NotificationRequest();

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

        notificationRequest.setUserStuId(params.getUserStuId());
        if(params.getRoomId() <= 13) {
            notificationRequest.setNotiContent("스터디룸 이용 예약이 완료되었습니다.");
        } else if(params.getRoomId() == 14) {
            notificationRequest.setNotiContent("오디토리움 이용 예약이 완료되었습니다.");
        } else
            notificationRequest.setNotiContent("VR룸 이용 예약이 완료되었습니다.");
        notificationRequest.setNotiTime(LocalDateTime.now());

        notificationService.saveNotification(notificationRequest);
        return "잘됐슈";     // 미완성
    }

    // 예약 정보 삭제
    @PostMapping("/reserve/delete")
    public void deleteReserve(@RequestParam final Long rezId) {
        roomService.deleteReserve(rezId);
    }

    // 예약 정보 조회
    @GetMapping("/reserve/list")
    public List<RoomReserveResponse> selectReserve(@RequestParam final Long userStuId) {
        return roomService.findRezById(userStuId);
    }
}
