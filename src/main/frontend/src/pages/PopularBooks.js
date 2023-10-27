import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BookList from "../components/BookList";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #000000;
`;
function PopularBooks() {
    return (
        <Wrapper>
            <Header />
            <BookList />
        </Wrapper>
    );

}

export default PopularBooks;

