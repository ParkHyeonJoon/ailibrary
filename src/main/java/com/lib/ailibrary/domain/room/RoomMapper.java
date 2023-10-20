package com.lib.ailibrary.domain.room;

import org.apache.ibatis.annotations.Mapper;

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
     * @param userStuId - PK
     * @return 예약 정보
     */
    List<RoomReserveResponse> findById(Long userStuId);

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
     * @param params - 학번, 예약 날짜
     * @return 예약 정보 수
     */
    int count(RoomCountRequest params);

    /**
     * 잔여 시설 조회
     * @return 잔여 시설
     */
    List<RoomSearchResponse> searchRoom(RoomSearchRequest params);



}
