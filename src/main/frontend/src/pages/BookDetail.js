import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  background: #000;
  color: #fff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const BackgroundImage = styled.div`
  background: url(${process.env.PUBLIC_URL}/assets/BookList/1.jpg); /* 배경 이미지 설정 */
  background-size: cover; /* 이미지를 컨테이너에 맞게 확대/축소 */
  width: 100%;
  height: 100vh; /* 화면 높이로 설정 (뷰포트 높이) */
  position: absolute;
  z-index: -1; /* 배경 이미지는 다른 요소 뒤에 표시되도록 */
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
    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookId}`)
            .then((response) => response.json())
            .then((data) => setBookInfo(data))
            .catch((error) => console.error("Error fetching book info: ", error));
    }, [bookId]);

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                <BackgroundImage style={{ backgroundImage: `url(${bookInfo.bookImage})` }} /> {/* 이미지 URL 사용 */}
                <BookInfo bookInfo={bookInfo} />
                <BookImage src={bookInfo.bookImage} alt="Book" /> {/* 이미지 URL 사용 */}
            </ContentWrapper>
        </Wrapper>
    );
};

export default BookDetail;