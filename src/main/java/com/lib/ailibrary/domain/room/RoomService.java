package com.lib.ailibrary.domain.room;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomMapper roomMapper;

    /**
     * 예약 정보 저장
     * @param params - 예약 정보
     * @return Generated PK
     */
    @Transactional
    public Long saveReserve(RoomReserveSaveRequest params) {
        roomMapper.save(params);
        return params.getRezId();
    }

    /**
     * 예약 정보 조회
     * @param userStuId - UK
     * @return 예약 정보
     */
    public List<RoomReserveResponse> findRezById(final Long userStuId) {

        return roomMapper.findById(userStuId);
    }

    /**
     * 예약 정보 수정 ( 보류 )
     */

    /**
     * 예약 정보 삭제
     * @param rezId - PK
     */
    public void deleteReserve(final Long rezId) {
        roomMapper.deleteById(rezId);
    }

    /**
     * 예약 내역 전체 조회
     * @return 예약 내역 전체
     */
    public List<RoomReserveResponse> findAllReserve() {
        return roomMapper.findAll();
    }

    /**
     * 잔여 시설 조회
     * @return 잔여 시설
     */
    public List<RoomSearchResponse> findRemainRoom(final RoomSearchRequest params) {

        return roomMapper.searchRoom(params);
    }
}
