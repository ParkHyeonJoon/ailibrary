import React, {useState, useEffect } from "react";
import styled from "styled-components";
import Line from "../common/Line";
import Review from "./Review";
import ReviewModal from "./ReviewModal";
import axios from "axios";

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
  &:hover {
    background: ${(props) =>
            props.backgroundColor || "#123456"};
  }
`;
const EntireReview = styled.div`
  width: 98%;
`;

function ReviewArea({bookInfo}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewSummary, setReviewSummary] = useState("");

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    useEffect(() => {
        if(userInfo && bookInfo.bookId) {
            axios
                .get(`http://localhost:8080/book/summary?bookId=${bookInfo.bookId}`)
                .then((response) => {
                    setReviewSummary(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
            }
    }, [bookInfo]);

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
            <ReviewSummary>{reviewSummary}</ReviewSummary>
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
