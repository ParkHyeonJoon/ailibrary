package com.lib.ailibrary.domain.room;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoomMapper {

    /**
     * 예약 정보 저장
     * @param params - 예약 정보
     */
    void save(RoomReserveRequest params);

    /**
     * 예약 정보 조회
     * @param roomReserveId - PK
     * @return 예약 정보
     */
    RoomReserveResponse findById(Long roomReserveId);

    /**
     * 예약 정보 수정
     * @param params - 예약 정보
     */
    void update(RoomReserveRequest params);

    /**
     * 예약 정보 삭제
     * @param roomReserveId - PK
     */
    void deleteById(Long roomReserveId);

    /**
     * 예약 내역 조회
     * @return 예약 내역
     */
    List<RoomReserveResponse> findAll();

    /**
     * 예약 정보 수 카운팅
     * @return 예약 정보 수
     */
    int count();
}
