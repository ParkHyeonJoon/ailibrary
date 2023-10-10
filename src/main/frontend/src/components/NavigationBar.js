import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    gap: 20px;
    height: 50px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const NavWrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const NavItem = styled.a`
    padding: 10px;
    color: black;
    text-decoration: none;
    font-size: 16px;
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

\` ;
`;

function NavigationBar() {
    return (
        <Wrapper>
            <NavWrapper>
                <NavItem href="/popularbooks">인기/신착</NavItem>
                <NavItem href="/facility-reservation">시설예약</NavItem>
                <NavItem href="#">도서관안내</NavItem>
                <NavItem href="/mypage">MyPage</NavItem>
            </NavWrapper>
        </Wrapper>
    );
}

export default NavigationBar;
