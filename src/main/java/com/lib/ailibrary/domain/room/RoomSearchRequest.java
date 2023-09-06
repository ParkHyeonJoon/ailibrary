package com.lib.ailibrary.domain.room;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Setter
@Getter
public class RoomSearchRequest {
    private String roomType;
    private Date rezDate;
    private String rezTime;
}
