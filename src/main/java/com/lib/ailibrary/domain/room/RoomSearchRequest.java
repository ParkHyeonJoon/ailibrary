package com.lib.ailibrary.domain.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class RoomSearchRequest {
    private String roomType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rezDate;
    private String[] rezTime;



}
