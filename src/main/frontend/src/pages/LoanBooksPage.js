import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LoanBooksFrame from "../components/LoanBooksFrame";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const Title = styled.p`
  text-align: left;
  color: #000000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ContentArea = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border: 0.5px solid #cccccc;
  padding-top: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  width: 1000px;
  margin-top: 150px;
`;

function LoanBooksPage() {
    const [loanbooks, setLoanBooks] = useState([]);

    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userStuId = userInfo.userStuId;

    useEffect(() => {
        // 두 개의 API를 병렬로 호출하는 함수
        const fetchData = async () => {
            try {
                const loanResponse = await fetch(`http://localhost:8080/book/loaned?userStuId=${userStuId}`);

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
    }, [userStuId]);


    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <Title>대출 내역 조회</Title>
                <ContentArea>
                    {loanbooks.map((loanbook) => (
                        <LoanBooksFrame
                            key={loanbook.bookLoanId}
                            book={loanbook}
                        />
                    ))}
                </ContentArea>
            </ContentWrapper>
        </Wrapper>
    );
}

export default LoanBooksPage;
