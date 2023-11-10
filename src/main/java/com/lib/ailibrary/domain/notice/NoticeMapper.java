package com.lib.ailibrary.domain.notice;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface NoticeMapper {

    /**
     * 공지사항 저장
     * @param params - 공지 정보
     */
    void save(NoticeRequest params);

    /**
     * 공지사항 상세정보 조회
     * @param noticeId - PK
     * @return 공지사항 상세정보
     */
    NoticeResponse findById(Long noticeId);

    /**
     * 공지사항 수정
     * @param params - 공지사항 정보
     */
    void update(NoticeRequest params);

    /**
     * 공지사항 삭제
     * @param noticeId - PK
     */
    void deleteById(Long noticeId);

    /**
     * 공지사항 리스트 조회
     * @return 공지사항 리스트
     */
    List<NoticeResponse> findAll();

    /**
     * 공지사항 수 카운팅
     * @return 공지사항 수
     */
    int count();
}

