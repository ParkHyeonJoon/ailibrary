package com.lib.ailibrary.oauth;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor   // 얘가 알아서 Autowired 해준다.
@RequestMapping("/oauth")
public class OAuthController {

    private OAuthService oAuthService;

    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */

    @ResponseBody
    @GetMapping("kakao")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        oAuthService.createKakaoUser(oAuthService.getKakaoAccessToken(code));
    }
}
