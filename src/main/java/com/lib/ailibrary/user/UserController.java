package com.lib.ailibrary.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원 정보 수정
    @PatchMapping("/user/{userStuId}")
    @ResponseBody
    public int updateUser(@PathVariable final Long userStuId, @RequestBody final UserRequest params) {
        return userService.updateUser(params);
    }

    // 회원 정보 삭제 (회원 탈퇴)
    @DeleteMapping("/user/{id}")
    @ResponseBody
    public int deleteUserByUserStuId (final int userStuId) {
        return userService.deleteUserByUserStuId(userStuId);
    }

    // 회원 수 카운팅 (ID 중복 체크)
    @GetMapping("/user-count")
    @ResponseBody
    public int countUserByUserId(@RequestParam final String userId) {
        return userService.countUserByUserId(userId);
    }

}
