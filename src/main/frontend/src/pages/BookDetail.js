import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BookInfo from "../components/BookInfo";

const Wrapper = styled.div`
  position: relative; /* 포지션 설정 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 180px;
  color: #fff;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: -30px;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  filter: blur(30px) brightness(0.4); /* 흐리게 처리하고 어둡게 처리 */
`;

const BookImage = styled.img`
  margin-top: -120px;
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
                <BackgroundImage imageUrl={bookInfo.bookImage} />
                <BookInfo bookInfo={bookInfo} />
                <BookImage src={bookInfo.bookImage} alt="Book" />
            </ContentWrapper>
        </Wrapper>
    );
};

export default BookDetail;
