import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Room from "../components/Room";
import Book from "../components/BookFrame";
import BookFrame from "../components/BookFrame";
import BookList from "../components/BookList";
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin-top: 150px;
  background-color: #E6E6E6; /* 원하는 어두운 색상 코드를 사용하세요 */
      color: #fff; /* 텍스트 색상을 밝게 설정할 수 있습니다. */
    `;

function PopularBooks() {
   const [popularBooks, setPopularBooks] = useState([]);
   //const location = useLocation();
   //const showText = location.pathname === "/popularbooks" ? "인기도서" : ""; // URL에 따라 showText 설정


    return (
        <Wrapper>
            <Header />
            <BookList />
        </Wrapper>
    );

}

export default PopularBooks;

