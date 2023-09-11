import React, { useState } from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
`;

function MyPage() {
    return (
        <Wrapper>
            <Header/>
            <MyProfile/>
        </Wrapper>
    );
}

export default MyPage;
