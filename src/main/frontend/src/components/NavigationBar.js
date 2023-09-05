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
`;

function NavigationBar() {
    return (
        <Wrapper>
            <NavWrapper>
                <NavItem href="/popularandnew">인기/신착</NavItem>
                <NavItem href="/facility-reservation">시설예약</NavItem>
                <NavItem href="#">도서관안내</NavItem>
                <NavItem href="#">MyPage</NavItem>
            </NavWrapper>
        </Wrapper>
    );
}

export default NavigationBar;
