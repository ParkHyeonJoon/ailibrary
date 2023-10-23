package com.lib.ailibrary.domain.book;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface
BookLoanMapper {

    /**
     * 대출 정보 저장
     * @param - 대출 정보
     */
    void save(BookLoanRequest param);

    /**
     * 대출 정보 조회
     * @param - bookLoanId(대출 아이디)
     * @return - 대출 정보
     */
    List<BookLoanResponse> findByAll();

    /**
     * 대출 정보 수정
     * @param - bookLoanId
     */
    void update(BookLoanRequest param);

    /**
     * 대출 정보 삭제
     * @param - bookLaonId
     */
    void deleteById(int bookLoanId);

    /**
     * 대출 상태 확인
     * @param - bookId
     */
    int checkBookLoan(int bookId);

    int checkBook(@Param("userId") String userId, @Param("bookId") int bookId);

    int checkBookCount(String userId);

    void checkBookReturn(@Param("userId") String userId, @Param("bookId") int bookId);

    List<BookLoanResponse> checkBookLoaning(String userId);
}
