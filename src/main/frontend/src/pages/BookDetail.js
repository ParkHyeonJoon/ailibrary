import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BookInfo from "../components/BookInfo";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  color: white;

`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: black;
  z-index: -100;
`;

const BackgroundImage = styled.div`
  background-image: url('/assets/BookList/1.jpg'); /* 배경 이미지 설정 */
  background-size: cover; /* 이미지를 컨테이너에 맞게 확대/축소 */
  filter: brightness(50%) blur(50px); /* 밝기와 블러 필터 적용 */
  width: 100%;
  height: 100%; /* 화면 높이로 설정 (뷰포트 높이) */
  position: absolute;
  z-index: -1; /* 배경 이미지는 Wrapper 위에 표시되도록 */
  top: -30px;
`;


const BookImage = styled.img`
  margin-top: 40px;
  width: 300px;
  height: 450px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookDetail = () => {
  return (
      <Wrapper>
        <Header />
        <ContentWrapper>
          <BackgroundImage />
          <BookInfo />
          <BookImage src={`${process.env.PUBLIC_URL}/assets/BookList/1.jpg`} alt="Book" />
        </ContentWrapper>
      </Wrapper>
  );
};

export default BookDetail;