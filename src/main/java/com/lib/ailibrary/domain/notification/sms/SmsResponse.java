package com.lib.ailibrary.domain.notification.sms;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SmsResponse {
    String reqeustId;
    LocalDateTime requestTime;
    String statusCode;
    String statusName;
}
