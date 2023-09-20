package com.lib.ailibrary.jwt.controller;

import com.lib.ailibrary.jwt.entity.User;
import com.lib.ailibrary.jwt.service.UserJwtService;
import com.lib.ailibrary.jwt.dto.UserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserJwtController {
    private final UserJwtService userJwtService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userJwtService.signup(userDto));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userJwtService.getMyUserWithAuthorities().get());
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable String userId) {
        return ResponseEntity.ok(userJwtService.getUserWithAuthorities(userId).get());
    }
}
