import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LikeBookFrame from "./LikeBookFrame";

const Wrapper = styled.div`
  margin-top: 20px;
  width: 1000px;
  color: #ffffff;
`;

const SectionWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤을 허용 */
  white-space: nowrap; /* 자식 요소들을 한 줄로 나열 */
`;

const Title = styled.p`
  margin-left: 20px;
  color: #ffffff;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
`;

function LikeBookList({ book }) {
    const [likeBooks, setLikeBooks] = useState([]);

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userId = userInfo.userId;
    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const likeResponse = await fetch(`http://localhost:8080/book/likeBooklist?userId=${userId}`);

                if (!likeResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const likeData = await likeResponse.json();

                setLikeBooks(likeData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, [userId]);

    return (
        <Wrapper>
            <Title>찜 도서</Title>
            <SectionWrapper>
                {likeBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                        <LikeBookFrame book={book} />

                    </div>
                ))}
            </SectionWrapper>
        </Wrapper>
    );
}

export default LikeBookList;
