package com.lib.ailibrary.domain.notification.sms;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class MessageDTO {
    private String to;
    private String content;
}
