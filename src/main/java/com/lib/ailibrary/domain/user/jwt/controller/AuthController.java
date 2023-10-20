package com.lib.ailibrary.domain.user.jwt.controller;

import com.lib.ailibrary.domain.user.jwt.common.JwtFilter;
import com.lib.ailibrary.domain.user.jwt.common.TokenProvider;
import com.lib.ailibrary.domain.user.jwt.dto.LoginDto;
import com.lib.ailibrary.domain.user.jwt.entity.User;
import com.lib.ailibrary.domain.user.jwt.service.UserJwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", exposedHeaders = "Authorization")  // exposeHeaders로 헤더를 허용해야 프론트에서 헤더 값 불러올 수 있음
@RequiredArgsConstructor
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserJwtService userJwtService;

    @PostMapping("/authenticate")
    public ResponseEntity<User> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUserId(), loginDto.getUserPw());

        // authenticate 메소드가 실행이 될 때 CustomUserDetailsService class의 loadUserByUsername 메소드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 해당 객체를 SecurityContextHolder에 저장하고
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // authentication 객체를 createToken 메소드를 통해서 JWT Token을 생성
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        // response header에 jwt token에 넣어줌
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        User user = userJwtService.getUserWithAuthorities(loginDto.getUserId()).get();
        // tokenDto를 이용해 response body에도 넣어서 리턴
        return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
    }
}