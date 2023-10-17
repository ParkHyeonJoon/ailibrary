package com.lib.ailibrary.jwt.repository;

import com.lib.ailibrary.jwt.entity.UserAuthority;
import com.lib.ailibrary.jwt.entity.UserAuthorityId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthorityRepository extends JpaRepository<UserAuthority, UserAuthorityId> {

    Optional<UserAuthority> findByIdUserStuId(Long userStuId);
}
