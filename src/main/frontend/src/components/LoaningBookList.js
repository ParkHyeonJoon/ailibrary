import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookFrame from "./BookFrame";

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

function LoaningBookList({ book }) {
    const [loanBooks, setLoanBooks] = useState([]);

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userId = userInfo.userId;
    const userStuId = userInfo.userStuId;
    useEffect(() => {

        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const loanResponse = await fetch(`http://localhost:8080/book/loaning?userStuId=${userStuId}`);

                if (!loanResponse.ok) {
                    throw new Error("Network response was not ok");
                }

                const loanData = await loanResponse.json();

                setLoanBooks(loanData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchData();
    }, [userId]);

    return (
        <Wrapper>
            <Title>대출 중인 도서</Title>
            <SectionWrapper>
                {loanBooks.map((book, index) => (
                    <div style={{ display: 'inline-block', margin: '20px' }} key={index}>
                        <BookFrame book={book} showReturnDate={true}/>

                    </div>
                ))}
            </SectionWrapper>
        </Wrapper>
    );
}

export default LoaningBookList;