import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MyProfile from '../components/MyProfile';
import SliderComponent from '../components/BookSliderV2';

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
    const [likeBooks, setLikeBooks] = useState([]);
    const [reserveBooks, setReserveBooks] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

        if (!parsedUserInfo) {
            alert('로그인 후 이용이 가능한 페이지입니다.');
            navigate('/login');
        } else {
            setUserInfo(parsedUserInfo);
            const fetchData = async () => {
                try {
                    const loanResponse = await fetch(`http://localhost:8080/book/loaning?userStuId=${parsedUserInfo.userStuId}`);
                    const likeResponse = await fetch(`http://localhost:8080/book/likeBooklist?userId=${parsedUserInfo.userId}`);
                    const reserveResponse = await fetch(`http://localhost:8080/book/reserving?userStuId=${parsedUserInfo.userStuId}`);

                    if (!loanResponse.ok || !likeResponse.ok || !reserveResponse.ok ) {
                        throw new Error("Network response was not ok");
                    }

                    const loanData = await loanResponse.json();
                    const likeData = await likeResponse.json();
                    const reserveData = await reserveResponse.json();

                    setLoanBooks(loanData);
                    setLikeBooks(likeData);
                    setReserveBooks(reserveData);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                } finally {
                    setIsLoading(false); // 데이터 로딩이 완료되었음을 표시
                }
            };
            fetchData();
        }
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // 데이터 로딩 중인 동안 로딩 스피너 또는 메시지를 표시합니다.
    }

    return (
        <Wrapper>
            <Header />
            <ContentArea>
                {userInfo && <MyProfile userInfo={userInfo} />}
                <SliderComponent
                    title="대출 중인 도서"
                    books={loanBooks}
                    showRank={false}
                    showReturnDate={true}
                    targetPath="/loanbooks"
                />
                <SliderComponent
                    title="찜한 도서"
                    books={likeBooks}
                />
                <SliderComponent
                    title="예약 도서"
                    books={reserveBooks}
                    targetPath="/reservebooks"
                />
            </ContentArea>
        </Wrapper>
    );
}

export default MyPage;
