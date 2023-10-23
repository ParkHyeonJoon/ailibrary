import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import BookFrame from "../components/BookFrame";
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  margin-top: 180px;
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
function AllBooks() {
   const [allBooks, setAllBooks] = useState([]);

   useEffect(() => {
           // 서버에서 데이터 가져오는 요청
           fetch("http://localhost:8080/book/all")
               .then((response) => response.json())
               .then((data) => setAllBooks(data))
               .catch((error) => console.error("Error fetching data: ", error));
       }, []);

    return (
        <Wrapper>
            <Header />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {allBooks.length === 0 ? (
                <p>Loading...</p>
            ) : (
                allBooks.map((book, index) => (
                    <div style={{ width: 'calc(15% - 10px)', margin: '10px 0' }} key={index}>
                        <BookFrame book={book} />
                    </div>
                ))
            )}
            </div>
        </Wrapper>
    );

}

export default AllBooks;

