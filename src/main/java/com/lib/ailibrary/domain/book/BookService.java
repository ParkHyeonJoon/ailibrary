package com.lib.ailibrary.domain.book;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookMapper bookMapper;

    /**
     * 도서 검색
     * @param bookTitle - 도서명으로 검색
     * @return 도서 정보
     */
    public Book findBookByTitle(final String bookTitle) {
        return bookMapper.findByTitle(bookTitle);
    }

    /**
     * 신착 도서 조회
     * @return - book_date 순으로
     */
    public List<Book> findNewBook() {
        return bookMapper.findNew();
    }

    /**
     * 인기 도서 조회
     * @return - book_good 순으로
     */
    public List<Book> findGoodBook() {
        return bookMapper.findGood();
    }

    /**
     * 소설 장르인 도서 조회
     * @return - category = 소설, book_good 순으로
     */
    public List<Book> findGenreFiction() {
        return bookMapper.findGenreFiction();
    }

    public List<Book> findGenreDevelopment() {
        return bookMapper.findGenreDevelopment();
    }

    public List<Book> findGenreScience() {
        return bookMapper.findGenreScience();
    }

    public List<Book> findGenreComputer() {
        return bookMapper.findGenreComputer();
    }

    public List<Book> findGenreEssay() {
        return bookMapper.findGenreEssay();
    }

    public List<Book> findGenreEconomy() {
        return bookMapper.findGenreEconomy();
    }

    public List<Book> findGenreBiographical() {
        return bookMapper.findGenreBiographical();
    }


    /**
     * 도서 목록 전체 조회
     * @return 도서 목록 전체
     */
    public List<Book> findAllBook() {
        return bookMapper.findAll();
    }

    /**
     * 도서 ID로 검색
     * @param bookId - 도서 ID로 검색
     * @return 도서 정보
     */
    public Book findBookById(int bookId) {
        return bookMapper.findById(bookId);
    }

    /**
     * 도서 검색 기능
     * @param keyword
     */
    public List<Book> findBookByKeyword(String keyword) {
        keyword = "%" + keyword + "%";
        return bookMapper.find(keyword);
    }

    /**
     * 도서 찜 수 증가
     * @param bookId
     */
    @Transactional
    public void increaseBookGood(int bookId) {
        try {
            bookMapper.increaseBookGood(bookId);
            System.out.println("성공");
        } catch(Exception e) {
            System.out.println("여기서 에러");
            System.out.println(bookId);
            e.printStackTrace(); // 예외 정보 출력
        }
    }

    /**
     * 도서 찜 수 감소
     * @param bookId
     */
    @Transactional
    public void decreaseBookGood(int bookId) {
        try {
            bookMapper.decreaseBookGood(bookId);
        } catch (Exception e) {
            System.out.println("이곳에서 에러");
            e.printStackTrace();
        }
    }

    /**
     * 해당 사용자가 해당 도서를 찜 했는지 확인
     * @param userId
     * @param bookId
     * @return
     */
    public int checkUserLikeBook(String userId, int bookId) {
        int count = bookMapper.checkUserLike(userId, bookId);
        return count;
    }

    /**
     * 찜 테이블에 찜 생성
     * @param userId
     * @param bookId
     */
    public void likeBook(String userId, int bookId) {
        try {
            bookMapper.isLike(userId, bookId);
            bookMapper.increaseBookGood(bookId);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 찜 테이블에서 찜 삭제
     * @param userId
     * @param bookId
     */
    public void unlikeBook(String userId, int bookId) {
        try{
            bookMapper.unLike(userId, bookId);
            bookMapper.decreaseBookGood(bookId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 사용자가 찜한 도서 목록 조회
     * @param userId
     * @return List<Book>
     */
    public List<Book> checkLikeBook(String userId) {
        List<Book> likeBooklist = bookMapper.checkLikeBook(userId);
        return likeBooklist;
    }

    /**
     * 사용자가 예약해놓았던 도서 제목 조회
     */
    public String reserveBookTitle(int bookId) {
        String bookTitle = bookMapper.reserveBookTitle(bookId);
        return bookTitle;
    }
}