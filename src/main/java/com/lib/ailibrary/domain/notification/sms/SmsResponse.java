package com.lib.ailibrary.domain.notification.sms;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SmsResponse {
    private String reqeustId;
    private LocalDateTime requestTime;
    private String statusCode;
    private String statusName;
}
