package com.lib.ailibrary.domain.room;

import lombok.Setter;

@Setter
public class RoomImageRequest {
    private int roomId;         // PK
    private String roomType;    // 시설 종류
    private int roomFloor;      // 시설 층
    private String roomName;    // 시설 이름
    private byte[] image;       // 시설 이미지
}
