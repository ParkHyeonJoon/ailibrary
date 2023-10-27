//components/Header.js
import React from "react";
import SearchBar from './SearchArea';
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import Line from "../common/Line";

const StyledHeader = styled.header`
  width: 100%;
  position: fixed; /* 헤더를 화면 상단에 고정 */
  top: 0;
  left: 0;
  z-index: 10000; /* 다른 요소 위에 표시 */
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
`;

function Header() {
  return (
    <StyledHeader>
        <SearchBar />
        <NavigationBar/>
    </StyledHeader>
  );
}

export default Header;
