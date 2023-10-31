package com.lib.ailibrary.domain.notice;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeMapper noticeMapper;

    /**
     * 공지사항 저장
     * @param params - 공지사항 정보
     * @return Generated PK
     */
    @Transactional
    public Long saveNotice(final NoticeRequest params) {
        noticeMapper.save(params);
        return params.getNoticeId();
    }

    /**
     * 공지사항 상세정보 조회
     * @param noticeId - PK
     * @return 공지사항 상세정보
     */
    public NoticeResponse findNoticeById(final Long noticeId) {
        return noticeMapper.findById(noticeId);
    }

    /**
     * 공지사항 수정
     * @param params - 공지사항 정보
     * @return PK
     */
    @Transactional
    public Long updateNotice(final NoticeRequest params) {
        noticeMapper.update(params);
        return params.getNoticeId();
    }

    /**
     * 공지사항 삭제
     * @param noticeId - PK
     * @return PK
     */
    public Long deleteNotice(final Long noticeId) {
        noticeMapper.deleteById(noticeId);
        return noticeId;
    }

    /**
     * 공지사항 리스트 조회
     * @return 공지사항 리스트
     */
    public List<NoticeResponse> findAllNotice() {
        return noticeMapper.findAll();
    }
}
