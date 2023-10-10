import React, {useState, useEffect} from "react";

import styled from "styled-components";
import HeartImg from "../assets/heart.png"; // 이미지 파일의 상대 경로 설정
import EmptyHeartImg from "../assets/emptyheart.png"; // 이미지 파일의 상대 경로 설정

const Heart = styled.img`
  margin-bottom: -10px;
  cursor: pointer;
`;
function HeartButton(props) {
    const { isLiked, onClick } = props;

    return (
        <Heart
            src={isLiked ? HeartImg : EmptyHeartImg}
            onClick={onClick}/>
    );
}
export default HeartButton;