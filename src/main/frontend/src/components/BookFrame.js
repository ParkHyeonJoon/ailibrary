import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BookWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 270px;
  margin-right: -20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.p`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
  white-space: nowrap; /* 줄 바꿈 방지 */
  overflow: hidden; /* 내용이 넘칠 때 숨김 처리 */
  text-overflow: ellipsis; /* 넘친 내용에 "..." 표시 */
`;

const BookFrame = ({ book }) => {
    return (
        <Link to={`/book-detail/${book.bookId}`} style={{ textDecoration: "none" }}>
            <BookWrapper>
                <BookImage src={book.bookImage} alt={book.bookTitle} />
                <BookTitle>{book.bookTitle}</BookTitle>
            </BookWrapper>
        </Link>
    );
};

export default BookFrame;
