import React, { useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import LoaningBookList from "../components/LoaningBookList";
import BookSlider from "../components/BookSlider";
import ReserveBookList from "../components/ReserveBookList";
import LikeBookList from "../components/LikeBookList";

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
    return (
        <Wrapper>
            <Header/>
            <ContentArea>
                <MyProfile/>
                <LoaningBookList/>
                <ReserveBookList/>
                <LikeBookList/>
            </ContentArea>
        </Wrapper>
    );
}

export default MyPage;
