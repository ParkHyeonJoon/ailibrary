import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Line from "../common/Line";

const Wrapper = styled.div`
  width: 94%;
  height: 100px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: 0.5px solid #676767;
`;
const Date = styled.p`
  font-size: 14px;
  color: #ababab;
`;
const Content = styled.div`
    font-size: 14px;
`;
const Review = ( {bookInfo} ) => {
    const [reviews, setReviews] = useState([]);
    const { bookId } = useParams();
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    useEffect(() => {
         if (userInfo && bookId) {
             // 사용자 정보가 있을 때만 API 호출
             const userId = userInfo.userId;
             const userStuId = userInfo.userStuId;

        axios
            .get(`http://localhost:8080/review/${bookId}`)
            .then((response) => {
                const modifiedReviews = response.data.map((review) => ({
                ...review,
                userId: review.userId.substring(0, 3) + '*'.repeat(review.userId.length - 3),
                }));
                setReviews(modifiedReviews);
            })
            .catch((error) => console.error(error));
        }
    }, [bookId]);

    return (
        <div>
            {reviews.map((review) => (
                <Wrapper key={review.reviewId}>
                    <Date>{review.reviewDate} {review.userId}</Date>
                    <Content>
                        {review.review}
                    </Content>
                </Wrapper>
            ))}
        </div>
    );
};

export default Review;