package com.lib.ailibrary.config;

import com.lib.ailibrary.jwt.JwtAccessDeniedHandler;
import com.lib.ailibrary.jwt.JwtAuthenticationEntryPoint;
import com.lib.ailibrary.jwt.JwtSecurityConfig;
import com.lib.ailibrary.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
