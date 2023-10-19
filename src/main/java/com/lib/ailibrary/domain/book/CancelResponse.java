package com.lib.ailibrary.domain.book;

import lombok.Getter;

import java.util.List;

@Getter
public class CancelResponse {
    String userId;
    List<Integer> bookIds;
}
