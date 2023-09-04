//components/Header.js
import React from "react";
import SearchBar from './SearchArea';
import LoginArea from "./LoginArea";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import Line from "../common/Line";

const StyledHeader = styled.header`
    width: 100%;
`;

function Header() {
  return (
    <StyledHeader>
        <LoginArea />
        <SearchBar />
        <NavigationBar/>
        <Line/>
    </StyledHeader>
  );
}

export default Header;
