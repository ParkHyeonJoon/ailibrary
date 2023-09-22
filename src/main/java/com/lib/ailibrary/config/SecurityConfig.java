package com.lib.ailibrary.config;

import com.lib.ailibrary.jwt.common.JwtAccessDeniedHandler;
import com.lib.ailibrary.jwt.common.JwtAuthenticationEntryPoint;
import com.lib.ailibrary.jwt.common.JwtSecurityConfig;
import com.lib.ailibrary.jwt.common.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login").permitAll()
                        .requestMatchers("/user").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/book/{bookId}").permitAll() // 도서 상세정보
                        .requestMatchers("/book/all").permitAll() // 전체 도서 조회
                        .requestMatchers("/book/search").permitAll() // 도서 검색
                        .requestMatchers("/api/authenticate").permitAll() // 로그인 api
                        .requestMatchers("/api/signup").permitAll() // 회원가입 api
                        .requestMatchers("/favicon.ico").permitAll()
                .anyRequest().authenticated())
                .csrf(setting -> setting.disable())
                .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .formLogin(setting -> setting.disable())
                .exceptionHandling(authenticationManager -> authenticationManager
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler))
                .apply(new JwtSecurityConfig(tokenProvider));
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
