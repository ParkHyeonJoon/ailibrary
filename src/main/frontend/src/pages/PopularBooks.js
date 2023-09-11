import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Room from "../components/Room";
import Book from "../components/BookFrame";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin-top: 150px;
    `;
const Title = styled.p`
    text-align: left;
    color: #000;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
function PopularBooks() {

    return (
        <Wrapper>
            <Header/>
            <Title>인기도서</Title>

            <Book/>
        </Wrapper>
    );
}

export default PopularBooks;