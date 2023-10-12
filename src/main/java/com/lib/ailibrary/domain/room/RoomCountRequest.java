package com.lib.ailibrary.domain.room;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RoomCountRequest {
    private Long userStuId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rezDate;
}
