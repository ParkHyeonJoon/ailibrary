import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const BookWrapper = styled.div`
  position: relative;
  width: 140px; /* 책 컴포넌트의 너비 설정 */
  margin: 10px;
  transition: transform 0.3s ease; /* 마우스 오버시 애니메이션 효과 */

  &:hover {
    transform: scale(1.05); /* 마우스 오버시 확대 효과 */
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
`;

const BookFrame = (title) => {
    return (
        <Link to="/book-detail">
        <BookWrapper>
            <BookImage src={`${process.env.PUBLIC_URL}/assets/BookList/1.jpg`} alt={title}/>
            <BookTitle>1%를 읽는 힘</BookTitle>
        </BookWrapper>
        </Link>
    );
};

export default BookFrame;