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
     * 타인의 대출 상태 확인
     * @param - bookId
     */
    int checkBookLoan(int bookId);

    /**
     * 내 대출 상태 확인
     * @param userStuId
     * @param bookId
     * @return
     */
    int checkBook(@Param("userStuId") long userStuId, @Param("bookId") int bookId);

    /**
     * 본인이 몇권 대여했는지(5권 이상이면 대출 불가)
     * @param userStuId
     * @return
     */
    int checkBookCount(long userStuId);

    /**
     * 도서 반납 기능
     * @param userStuId
     * @param bookId
     */
    void updateBookReturnState(@Param("userStuId") long userStuId, @Param("bookId") int bookId);

    LocalDate getReturnDate(@Param("userStuId") long userStuId, @Param("bookId") int bookId);

    List<BookLoanResponse> checkBookLoaning(long userStuId);

    List<BookLoanResponse> checkBookLoaned(long userStuId);
}
