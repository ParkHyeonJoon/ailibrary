import React, { useState, useEffect } from "react";
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
   const [popularBooks, setPopularBooks] = useState([]);

   useEffect(() => {
           // 서버에서 데이터 가져오는 요청
           fetch("http://localhost:8080/book/all")
               .then((response) => response.json())
               .then((data) => setPopularBooks(data))
               .catch((error) => console.error("Error fetching data: ", error));
       }, []);

    return (
        <Wrapper>
            <Header />
            <Title>인기도서</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {popularBooks.length === 0 ? (
                <p>Loading...</p>
            ) : (
                popularBooks.map((book, index) => (
                    <div style={{ width: 'calc(33.33% - 10px)', margin: '10px 0' }} key={index}>
                        <p key={`title_${index}`}>도서 제목: {book.bookTitle}</p>
                        <p key={`author_${index}`}>작가명: {book.author}</p>
                        <p key={`publishedDate_${index}`}>출판 연도: {book.publishedDate}</p>
                        <img src={book.bookImage} alt={`${book.bookTitle} 이미지`} />
                    </div>
                ))
            )}
            </div>
        </Wrapper>
    );

}

export default PopularBooks;