package com.lib.ailibrary.interceptor;

import com.lib.ailibrary.user.UserResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 1. 세션에서 회원 정보 조회
        HttpSession session = request.getSession();
        UserResponse user = (UserResponse) session.getAttribute("loginUser");

        // 2. 회원 정보 체크
        if (user == null) {
            response.sendRedirect("/"); // 미완성
            return false;
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
