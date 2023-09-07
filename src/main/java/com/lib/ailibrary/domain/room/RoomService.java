package com.lib.ailibrary.domain.room;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
    public Long saveReserve(final RoomReserveRequest params) {
        roomMapper.save(params);
        return params.getRezId();
    }

    /**
     * 예약 정보 조회
     * @param roomRezId - PK
     * @return 예약 정보
     */
    public RoomReserveResponse findRezById(final Long roomRezId) {
        return roomMapper.findById(roomRezId);
    }

    /**
     * 예약 정보 수정 ( 보류 )
     */

    /**
     * 예약 정보 삭제
     * @param roomRezId - PK
     * @return PK
     */
    public Long deleteReserve(final Long roomRezId) {
        roomMapper.deleteById(roomRezId);
        return roomRezId;
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
    public List<RoomSearchResponse> findRemainRoom(RoomSearchRequest params) {
        return roomMapper.searchRoom(params);
    }
}
