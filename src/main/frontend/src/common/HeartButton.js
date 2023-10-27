import React, { useState, useEffect } from "react";

import styled from "styled-components";
import HeartImg from "../assets/heart.png"; // 이미지 파일의 상대 경로 설정
import EmptyHeartImg from "../assets/emptyheart.png"; // 이미지 파일의 상대 경로 설정

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  margin-left: 30px;
  height: 70px;
  cursor: pointer;
`;

const Heart = styled.img`
    margin-bottom: -10px;
`;

const Text = styled.p`
  padding: 0;
  font-size: 13px;
  font-family: Inter;
  font-weight: 800;
`;

const HeartButton = ({ isLiked, onClick }) => {
    return (
        <Wrapper onClick={onClick}>
            <Heart src={isLiked ? HeartImg : EmptyHeartImg} />
            <Text>찜</Text>
        </Wrapper>
    );
};

export default HeartButton;