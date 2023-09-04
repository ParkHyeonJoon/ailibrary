import React from "react";
import styled from "styled-components";

const BookWrapper = styled.div`
  position: relative;
  width: 150px; /* 책 컴포넌트의 너비 설정 */
  margin: 10px;
  transition: transform 0.3s ease; /* 마우스 오버시 애니메이션 효과 */
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05); /* 마우스 오버시 확대 효과 */
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: auto;
`;

const BookInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 이미지 어두운 배경 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0; /* 초기에는 투명하게 설정 */
  transition: opacity 0.3s ease; /* 투명도 변화 애니메이션 */

  ${BookWrapper}:hover & {
    opacity: 1; /* 마우스 오버시 투명도 변경 */
  }
`;

const BookTitle = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const BookAuthor = styled.p`
  color: white;
  font-size: 14px;
`;

const BookFrame = ({ title, author, image }) => {
  return (
    <BookWrapper>
      <BookImage src={`${process.env.PUBLIC_URL}/assets/BookList/1.jpg`} alt={title} />
      <BookInfo>
        <BookTitle>{title}</BookTitle>
        <BookAuthor>{author}</BookAuthor>
      </BookInfo>
    </BookWrapper>
  );
};

export default BookFrame;