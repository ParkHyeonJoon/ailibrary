package com.lib.ailibrary.domain.book;

import com.lib.ailibrary.jwt.TokenProvider;
import com.lib.ailibrary.jwt.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookLikeController {

    private final BookLikeService bookLikeService;

    @GetMapping
    public Long getMyInfo() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = (User)principal;
        Long id = ((User) principal).getUserStuId();

        return id;

    }

    @PostMapping("/toggle")
    public ResponseEntity<String> toggleLike(@RequestParam("userStuId") int userStuId, @RequestParam("bookId") int bookId) {
        try {
            // 중복 확인: 사용자가 이미 해당 도서를 찜했는지 체크
            boolean isLiked = bookLikeService.isUserLikeBook(userStuId, bookId);

            if (isLiked) {
                // 이미 찜한 도서라면 찜을 해제
                bookLikeService.unlikeBook(userStuId, bookId);
                return ResponseEntity.ok("찜 해제됨");
            } else {
                // 찜되지 않은 도서라면 찜을 추가
                bookLikeService.likeBook(userStuId, bookId);
                return ResponseEntity.ok("찜 완료");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("에러 발생");
        }
    }
}
