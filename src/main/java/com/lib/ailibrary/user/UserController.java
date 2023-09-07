package com.lib.ailibrary.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/user/join")
    public void joinMember(final UserRequest params) {
        userService.join(params);
    }

    // 로그인
    @PostMapping("user/login")
    public List<UserResponse> userLogin(final UserLoginRequest params) {
        return userService.login(params);
    }

}
