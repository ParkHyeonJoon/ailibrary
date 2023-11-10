package com.lib.ailibrary.domain.notice;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRequest {

    private Long noticeId;
    private String noticeTitle;
    private String noticeContent;
    private String noticeWriter;
    private Boolean noticeCheck;
}
