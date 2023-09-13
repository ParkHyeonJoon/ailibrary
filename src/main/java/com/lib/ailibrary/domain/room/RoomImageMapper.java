package com.lib.ailibrary.domain.room;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoomImageMapper {

    /**
     * 시설 정보 저장
     * @param params - 시설 정보
     */
    void save(RoomImageRequest params);
}
