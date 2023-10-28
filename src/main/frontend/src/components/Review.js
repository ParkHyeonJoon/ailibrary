import React from 'react'
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
const Review = () => {
    return (
        <Wrapper>
            <Date>2023.10.27</Date>
            <Content>
                참마음이 되면 영원히 산디는게 가장 획기적인 얘기다.
                이루이면 좋겠다. 작가님의 삽화 세계명상. 연필로 스케치해준게 너무 센스가 넘치네.
            </Content>
        </Wrapper>
    );
};

export default Review;