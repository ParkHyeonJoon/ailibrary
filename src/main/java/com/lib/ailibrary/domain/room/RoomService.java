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
        return params.getRoomReserveId();
    }

    /**
     * 예약 정보 조회
     * @param roomResserveId - PK
     * @return 예약 정보
     */
    public RoomReserveResponse findReserveById(final Long roomResserveId) {
        return roomMapper.findById(roomResserveId);
    }

    /**
     * 예약 정보 수정 ( 보류 )
     */

    /**
     * 예약 정보 삭제
     * @param roomReserveId - PK
     * @return PK
     */
    public Long deleteReserve(final Long roomReserveId) {
        roomMapper.deleteById(roomReserveId);
        return roomReserveId;
    }

    /**
     * 예약 내역 전체 조회
     * @return 예약 내역 전체
     */
    public List<RoomReserveResponse> findAllReserve() {
        return roomMapper.findAll();
    }
}
