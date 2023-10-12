package com.lib.ailibrary.domain.room;

import com.lib.ailibrary.domain.notification.NotificationRequest;
import com.lib.ailibrary.domain.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
        LocalDate currentDate = LocalDate.now();

        RoomSearchRequest params = new RoomSearchRequest();
        params.setRoomType(roomType);
        params.setRezDate((LocalDateTime.parse(rezDate, DateTimeFormatter.ISO_DATE_TIME)).toLocalDate());
        params.setRezTime(rezTime);

        int[] rezTimeCheck = new int[rezTime.length];

        LocalDate parseRezDate = params.getRezDate();
        for(int i=0; i<rezTime.length; i++) {
            rezTimeCheck[i] = Integer.parseInt(rezTime[i].substring(0, 2));
            if ( (parseRezDate.isBefore(LocalDate.now())) || (rezTimeCheck[i] <= LocalTime.now().getHour() && parseRezDate.isEqual(LocalDate.now())) ) {
                throw new IllegalArgumentException("예약 가능일이 아닙니다.");
            } else if(parseRezDate.getDayOfWeek() == DayOfWeek.SATURDAY || parseRezDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
                throw new IllegalArgumentException("주말은 예약이 불가합니다.");
            }
        }

        List<RoomSearchResponse> resultList = roomService.findRemainRoom(params);
        return resultList;
    }

    // 신규 예약 생성
    @PostMapping("/reserve/save")
    public String saveReserve(@RequestBody final RoomReserveRequest params) {

        RoomCountRequest roomCountRequest = new RoomCountRequest();
        roomCountRequest.setUserStuId(params.getUserStuId());
        roomCountRequest.setRezDate(params.getRezDate());

        if (roomService.reserveCount(roomCountRequest)  + params.getRezTime().length < 4) {  // 기존 예약 개수 + 예약하려는 개수가 4 미만이면 예약 가능
            NotificationRequest notificationRequest = new NotificationRequest();

            for (int i = 0; i < params.getRezTime().length; i++) {
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
            if (params.getRoomId() <= 13) {
                notificationRequest.setNotiContent("스터디룸 이용 예약이 완료되었습니다.");
            } else if (params.getRoomId() == 14) {
                notificationRequest.setNotiContent("오디토리움 이용 예약이 완료되었습니다.");
            } else {
                notificationRequest.setNotiContent("VR룸 이용 예약이 완료되었습니다.");
            }
            notificationRequest.setNotiTime(LocalDateTime.now());

            notificationService.saveNotification(notificationRequest);

            return "예약이 완료되었습니다.";
        } else
            throw new IllegalArgumentException("당일 예약이 3개를 초과하여 예약이 불가합니다.");

    }

    // 예약 정보 삭제
    @DeleteMapping("/reserve/delete")
    public String deleteReserve(@RequestBody final Long rezId) {
        roomService.deleteReserve(rezId);
        return "삭제 완료";
    }

    // 예약 정보 조회
    @GetMapping("/reserve/list")
    public List<RoomReserveResponse> selectReserve(@RequestParam final Long userStuId) {
        return roomService.findRezById(userStuId);
    }
}
