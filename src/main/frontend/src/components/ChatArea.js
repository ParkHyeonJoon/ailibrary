import React, { useState } from "react";
import styled from "styled-components";
import ChatWindow from "./ChatWindow"; // ChatWindow 컴포넌트 불러오기
import NavContent from "./NavContent";

const Wrapper = styled.div`
  width: 100%;
  height: 585px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  color: #ffffff;
`;

const TitleArea = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

const StyledTitle = styled.p`
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:not(:last-child) {
    font-size: 30px;
  }
`;

const ChatFrame = styled.div`
  width: 85%;
  height: 100%;
  border: none;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const ChatInput = styled.input`
  width: 90%;
  height: 25px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 2px;
  background: #FFF;
  border: none;
  box-shadow: 0px 4px 8px 5px rgba(0, 0, 0, 0.15);
`;
const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: rgba(50, 190, 63, 0.24);
`;

function ChatArea() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        setMessages([...messages, { text: message, isUser: true }]);
        // AI 답변 로직을 구현하여 아래와 같은 방식으로 메시지 추가
        // setMessages([...messages, { text: aiResponse, isUser: false }]);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSendMessage(e.target.value);
            e.target.value = "";
            e.preventDefault(); // Enter 키의 기본 동작 중지
        }
    };

    return (
        <Wrapper>
            <TitleArea>
                <StyledTitle>ChatLPT</StyledTitle>
                <StyledTitle>채팅을 통해 도서관 서비스를 이용해보세요</StyledTitle>
            </TitleArea>
            <ContentArea>
                <NavContent />
                <ChatFrame>
                    <ChatWindow messages={messages} />
                    <ChatInput
                        placeholder="메시지 입력..."
                        onKeyPress={handleKeyPress}
                    />
                </ChatFrame>
            </ContentArea>
        </Wrapper>
    );
}

export default ChatArea;
