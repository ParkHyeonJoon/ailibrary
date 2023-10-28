import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Line from "../common/Line";
import Review from "./Review";
import ReviewModal from "./ReviewModal";

const Wrapper = styled.div`
  position: relative; /* 포지션 설정 */
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #fff;
  margin-top: 20px;
`;
const Title = styled.h2`
  font-weight: 700;
  font-size: 17px;
`;
const ReviewSummary = styled.div`
  width: 94%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px;
  font-size: 14px;
  line-height: 25px;
  margin: 10px 0;
`;
const WriteBtn = styled.button`
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  position: absolute;
  top: 15px;
  right: 20px;
  background: #9c9aff;
  color: white;
  font-weight: 600;
  font-size: 13px;
`;
const EntireReview = styled.div`
  width: 98%;
`;

function ReviewArea({bookInfo}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const userId = userInfo.userId; //아이디
    const userStuId = userInfo.userStuId;// 학번
    const handleButtonClick = () => {
        if (!userInfo) {
            alert("로그인이 필요합니다");
            return;
        } else {
            setIsModalOpen(true);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Wrapper>
            <Title>ChatGPT로 리뷰를 요약했어요</Title>
            <ReviewSummary>부자가 되기 위해서는 생각을 바꿔야 합니다. 기성세대처럼 돈을 터부시 한다거나 욜로처럼 지금 이순간만 생각하는 건 굉장히 위험한 발상입니다. 유대인들을 보세요. 이들이
                돈을 다루는걸 보세요. 최근 존리의 주식투자 책을 보니 더더욱 유대인들이 돈을 바라보는 시점에 대해 잘 이해가 되네요. 성공하고 싶은 분들이라면 돈의 속성을 한번 읽어보세요. 제 주변에
                돈에 대해 떠드는 사람치고 부자인사람 한 명도 없습니다.</ReviewSummary>
            <EntireReview>
                <p>전체 리뷰</p>
                <WriteBtn onClick={handleButtonClick}>리뷰 작성</WriteBtn>
                <Line/>
                <Review/>
            </EntireReview>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={closeModal}
                bookInfo={bookInfo}
            />
        </Wrapper>
    )
};

export default ReviewArea;
