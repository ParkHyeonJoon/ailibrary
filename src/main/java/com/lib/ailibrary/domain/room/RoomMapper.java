package com.lib.ailibrary.domain.room;

import com.lib.ailibrary.user.UserService;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Mapper
public interface RoomMapper {

    /**
     * 예약 정보 저장
     * @param params - 예약 정보
     */
    void save(RoomReserveSaveRequest params);

    /**
     * 예약 정보 조회
     * @param rezId - PK
     * @return 예약 정보
     */
    RoomReserveResponse findById(Long rezId);

    /**
     * 예약 정보 수정
     * @param params - 예약 정보
     */
    void update(RoomReserveRequest params);

    /**
     * 예약 정보 삭제
     * @param rezId - PK
     */
    void deleteById(Long rezId);

    /**
     * 예약 내역 전체 조회
     * @return 예약 내역 전체
     */
    List<RoomReserveResponse> findAll();

    /**
     * 예약 정보 수 카운팅
     * @return 예약 정보 수
     */
    int count();

    /**
     * 잔여 시설 조회
     * @return 잔여 시설
     */
    List<RoomSearchResponse> searchRoom(RoomSearchRequest params);



}
