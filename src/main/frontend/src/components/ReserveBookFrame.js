import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const BookWrapper = styled.div`
  position: relative;
  width: 180px; /* 책 컴포넌트의 너비 설정 */
  height: 270px;
  margin-right: -20px;
  transition: transform 0.3s ease; /* 마우스 오버시 애니메이션 효과 */

  &:hover {
    transform: scale(1.05); /* 마우스 오버시 확대 효과 */
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookTitle = styled.p`
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const BookRezDate = styled.p`
  color: red;
  font-size: 15px;
  font-weight: 600;
`;

const CheckboxContainer = styled.label`
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 1;
  display: inline-block;
  background: #fff;
  padding: 5px;
  border-radius: 50%;
`;

const ReserveBookFrame = ({ book, selection, selected }) => {
    const [isChecked, setIsChecked] = useState(selected);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        selection(book.bookId, !isChecked);
    };

    const handleCancelReservation = () => {
        if(isChecked) {
            const dataToSend = {
                bookId: book.bookId,
            };
        }
    };

    return (
    <div style = {{ position: "relative" }}>
        <Link to={`/book-detail/${book.bookId}`}
              style={{ textDecoration: "none"}}> {/* 각 책에 대한 고유한 URL로 연결 */}
            <BookWrapper>
                <BookImage src={book.bookImage} alt={book.bookTitle} />
                <BookTitle>{book.bookTitle}</BookTitle>
                <BookRezDate>예약 기한 : {book.bookRezDate}</BookRezDate>
            </BookWrapper>
        </Link>

     </div>
    );
};

export default ReserveBookFrame;