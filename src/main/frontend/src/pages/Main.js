// pages/Home.js
import React from 'react';
import styled, {ThemeProvider} from "styled-components";
import Header from "../components/Header";
import ChatBotComponent from "../components/ChatBotComponent";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const ContentArea = styled.div`
  margin-top: 160px;
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

function Main() {

    return (
        <Wrapper>
            <Header/>
            <ContentArea>
                <ChatBotComponent/>
            </ContentArea>
        </Wrapper>
    );
}

export default Main;
