// pages/Home.js
import React from 'react';
import styled from "styled-components";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import MainBookList from '../components/MainBookList';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
    `;
function Main() {
  
  return (
    <Wrapper>
        <Header/>
        <ChatArea/>
        <MainBookList/>
    </Wrapper>
    );
}

export default Main;
