import React, { useState } from "react";
import styled from "styled-components";
import ChatWindow from "./ChatWindow"; // ChatWindow 컴포넌트 불러오기

const Wrapper = styled.div`
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 30px;
`;

const TitleArea = styled.div`
  padding-left: 20px;
  height: 40px;
  width: 900px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const StyledTitle = styled.p`
  color: #000;
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
    width: 900px;
    height: 480px;
    border: none;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);   
    display: flex; /* 가운데 정렬을 위한 추가 */
    justify-content: flex-start; /* 가운데 정렬을 위한 추가 */
    flex-direction: column;
    align-items: center;
`;
const ChatInput = styled.input`
    width: 800px;
    height: 25px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    background: #FFF;
    border: none;
    box-shadow: 0px 4px 8px 5px rgba(0, 0, 0, 0.15);
`;

function ChatArea() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    // AI 답변 로직을 구현하여 아래와 같은 방식으로 메시지 추가
    // setMessages([...messages, { text: aiResponse, isUser: false }]);
  };

  return (
    <Wrapper>
      <TitleArea>
        <StyledTitle>ChatLPT</StyledTitle>
        <StyledTitle>채팅을 통해 도서관 서비스를 이용해보세요</StyledTitle>
      </TitleArea>
      <ChatFrame>
      <ChatWindow messages={messages} /> {/* ChatWindow 컴포넌트 사용 */}
      <ChatInput
        placeholder="메시지 입력..."
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      />
      </ChatFrame>
    </Wrapper>
  );
}

export default ChatArea;
