//components/Header.js
import React from "react";
import SearchBar from './SearchArea';
import LoginArea from "./LoginArea";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import Line from "../common/Line";

const StyledHeader = styled.header`
  width: 100%;
  position: fixed; /* 헤더를 화면 상단에 고정 */
  top: 0;
  left: 0;
  z-index: 1000; /* 다른 요소 위에 표시 */
  background: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

function Header() {
  return (
    <StyledHeader>
        <LoginArea />
        <SearchBar />
        <NavigationBar/>
    </StyledHeader>
  );
}

export default Header;
