import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookFrame from "../components/BookFrame";

const Wrapper = styled.div`
  width: 100%;
  color: #000000;
`;

const SectionWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤을 허용 */
  white-space: nowrap; /* 자식 요소들을 한 줄로 나열 */
`;

const Title = styled.p`
  margin-left: 20px;
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 10px;
`;

function BookList({ book }) {
    const [topBooks, setTopBooks] = useState([]);
    const [newBooks, setNewBooks] = useState([]);
    const [fictionBooks, setFictionBooks] = useState([]);

    useEffect(() => {
        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const [topResponse, fictionResponse, newResponse] = await Promise.all([
                    fetch("http://localhost:8080/book/top"),
                    fetch("http://localhost:8080/book/fiction"),
                    fetch("http://localhost:8080/book/new"),
                ]);

                if (!topResponse.ok || !newResponse.ok || !fictionResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const topData = await topResponse.json();
                const fictionData = await fictionResponse.json();
                const newData = await newResponse.json();


                setTopBooks(topData);
                setFictionBooks(fictionData);
                setNewBooks(newData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, []);

    return (
        <Wrapper>
            {/* TOP 도서 */}
            <Title>오늘 도서관의 TOP 10 도서!!</Title>
            <SectionWrapper>
                {topBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                        <BookFrame book={book} />

                    </div>
                ))}
            </SectionWrapper>
            {/* 소설 도서 */}
            <Title>마법 같은 세계로 초대하는 소설들</Title>
            <SectionWrapper>
                {fictionBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                        <BookFrame book={book} />
                    </div>
                ))}
            </SectionWrapper>

            {/* 신규 도서 */}
            <Title>뜨끈뜨끈한 새로 들어온 도서들!</Title>
            <SectionWrapper>
                {newBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                        <BookFrame book={book} />
                    </div>
                ))}
            </SectionWrapper>
        </Wrapper>
    );
}

export default BookList;