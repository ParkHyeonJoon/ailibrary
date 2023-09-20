package com.lib.ailibrary.jwt.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity // DB의 테이블과 1:1 매핑되는 객체
@Table(name = "tb_users")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @JsonIgnore
    @Id // primary key
    @Column(name = "user_stu_id")
    private Long userStuId; //학번

    @Column(name = "user_name", length = 30)
    private String userName;

    @Column(name = "user_id", length = 30, unique = true)
    private String userId;  //로그인 아이디

    @JsonIgnore
    @Column(name = "user_pw", length = 70)
    private String userPw;

    @Column(name = "user_major", length = 30)
    private String userMajor;

    @Column(name = "user_grade", length = 10)
    private String userGrade;

    @Column(name = "user_email", length = 30)
    private String userEmail;

    @Column(name = "user_pnum", length = 15)
    private String userPnum;

    @JsonIgnore
    @Column(name = "activated")
    private boolean activated;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_stu_id", referencedColumnName = "user_stu_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;
    /*@JsonIgnore
    @Id // primary key
    @Column(name = "user_id")
    // 자동 증가 되는
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "username", length = 50, unique = true)
    private String username;

    @JsonIgnore
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @JsonIgnore
    @Column(name = "activated")
    private boolean activated;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;*/
}
