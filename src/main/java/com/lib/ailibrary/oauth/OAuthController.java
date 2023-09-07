package com.lib.ailibrary.oauth;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public <T> List<T> kakaoCallback(@RequestParam String code) {
        List<T> resultList = new ArrayList<>();
        System.out.println(code);
        resultList.add((T) oAuthService.checkMember(oAuthService.createKakaoUser(oAuthService.getKakaoAccessToken(code))));

       return resultList;

    }
}
