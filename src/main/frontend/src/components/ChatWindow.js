// ChatWindow.js
import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const StyledChatWindow = styled.div`
  width: 1000px;
  height: 380px;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 10px;
`;

const Message = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

function ChatWindow({ messages }) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <StyledChatWindow>
      {messages.map((message, index) => (
        <Message key={index} isUser={message.isUser}>
          {message.text}
        </Message>
      ))}
      <div ref={messageEndRef}></div>
    </StyledChatWindow>
  );
}

export default ChatWindow;
