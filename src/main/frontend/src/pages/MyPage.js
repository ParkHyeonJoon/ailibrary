import React, { useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import LoaningBookList from "../components/LoaningBookList";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 180px;
`;

function MyPage() {
    return (
        <Wrapper>
            <Header/>
            <MyProfile/>
            <LoaningBookList/>
        </Wrapper>
    );
}

export default MyPage;
