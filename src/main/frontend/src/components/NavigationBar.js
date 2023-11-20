import React from "react";
import styled from "styled-components";
import MainAlarm from "./MainAlarm";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 55px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 92%;
`;

const NavItem = styled.a`
  padding: 10px;
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 50px;
  }

  /* 마우스 오버 시 스타일 변경 */

  &:hover {
    color: ${(props) => props.hoverBackgroundColor || "#a4b2fe"};
    /* 원하는 다른 스타일 변경도 추가 가능 */
  }

\`                   ;
`;

function NavigationBar() {
    // 로컬 스토리지에서 userInfo 가져오기
    const storedUserInfo = localStorage.getItem("userInfo");

    // userInfo가 있을 때만 로그인 상태로 간주하여 MainAlarm 렌더링
    const isLoggedIn = !!storedUserInfo;
    return (
        <Wrapper>
            <NavWrapper>
                <NavItem href="/bookbytype">유형별도서</NavItem>
                <NavItem href="/facility-reservation">시설예약</NavItem>
                <NavItem href="/notice">도서관안내</NavItem>
                <NavItem href="/mypage">MyPage</NavItem>
            </NavWrapper>
            {/* userInfo가 있을 때만 MainAlarm을 렌더링 */}
            {isLoggedIn && <MainAlarm />}
        </Wrapper>
    );
}

export default NavigationBar;
