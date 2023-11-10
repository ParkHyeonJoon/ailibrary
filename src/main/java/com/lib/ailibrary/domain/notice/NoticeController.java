package com.lib.ailibrary.domain.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", exposedHeaders = "Authorization")
public class NoticeController {

    private final NoticeService noticeService;

    // 공지사항 저장
    @PostMapping("/notice/save")
    public String saveNotice(@RequestBody final NoticeRequest params) {
        noticeService.saveNotice(params);

        return "작성이 완료되었습니다.";
    }

    // 공지사항 상세정보 조회
    @GetMapping("/notice/view")
    public NoticeResponse viewNotice(@RequestParam final Long noticeId) {
        return noticeService.findNoticeById(noticeId);
    }

    // 공지사항 수정
    @PostMapping("/notice/update")
    public Long updateNotice(@RequestBody NoticeRequest params) {
        return noticeService.updateNotice(params);
    }

    // 공지사항 삭제
    @PostMapping("/notice/delete")
    public Long deleteNotice(@RequestParam final Long noticeId) {
        return noticeService.deleteNotice(noticeId);
    }

    // 공지사항 리스트
    @GetMapping("/notice/list")
    public List<NoticeResponse> noticeList() {
        return noticeService.findAllNotice();
    }
}
