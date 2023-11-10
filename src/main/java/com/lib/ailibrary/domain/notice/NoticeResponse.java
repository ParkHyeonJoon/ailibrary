package com.lib.ailibrary.domain.notice;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponse {

    private Long noticeId;
    private String noticeTitle;
    private String noticeContent;
    private String noticeWriter;
    private int viewCnt;
    private Boolean noticeCheck;
    private Boolean deleteCheck;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

}
