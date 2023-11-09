import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import ReserveBookList from "../components/ReserveBookList";
import LikeBookList from "../components/LikeBookList";
import SliderComponent from "../components/BookSliderV2";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #000000;
`;
const ContentArea = styled.div`
  width: 100%;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MyPage() {
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
            <Header/>
            <ContentArea>
                <MyProfile/>
                <SliderComponent
                    title="대출 중인 도서"
                    books={loanBooks}
                    showRank={false}
                    showReturnDate={true}
                    targetPath={"/loanbooks"}
                />
                <ReserveBookList/>
                <LikeBookList/>
            </ContentArea>
        </Wrapper>
    );
}

export default MyPage;
