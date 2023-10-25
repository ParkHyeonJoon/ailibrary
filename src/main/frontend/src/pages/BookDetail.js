import {useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BookInfo from "../components/BookInfo";

const Wrapper = styled.div`
  position: relative; /* 포지션 설정 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  min-height: 100vh;
  background: black;
`;

const ContentWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  margin-top: 220px;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: -30px;
  right: -30px; /* 오른쪽에 -30px 여백 추가 */
  bottom: -30px; /* 아래에 -30px 여백 추가 */
  left: -30px; /* 왼쪽에 -30px 여백 추가 */
  width: calc(100% + 60px); /* 가로 너비에 60px 여백 추가 */
  height: calc(100% + 60px); /* 세로 높이에 60px 여백 추가 */
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  filter: blur(30px) brightness(0.5); /* 흐리게 처리하고 어둡게 처리 */
`;


const BookImage = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 5px;
  box-shadow: 0px 7px 4px rgba(0, 0, 0, 0.2);
`;

const BookDetail = () => {
    const {bookId} = useParams();
    const [bookInfo, setBookInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookId}`)
            .then((response) => response.json())
            .then((data) => setBookInfo(data))
            .catch((error) => console.error("Error fetching book info: ", error));
    }, [bookId]);

    return (
        <Wrapper>
            <Header/>
            <BackgroundImage imageUrl={bookInfo.bookImage}/>
            <ContentWrapper>
                <BookInfo bookInfo={bookInfo}/>
                <BookImage src={bookInfo.bookImage} alt="Book"/>
            </ContentWrapper>
        </Wrapper>
    );
};

export default BookDetail;
