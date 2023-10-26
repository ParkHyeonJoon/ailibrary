// ChatWindow.js
import React, {useRef, useEffect} from "react";
import styled from "styled-components";

const StyledChatWindow = styled.div`
  width: 90%;
  height: 380px;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 10px;
  background: black;
  box-shadow: 0px 4px 4px 3px rgba(0, 0, 0, 0.25);
`;

const Message = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

function ChatWindow({messages}) {
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({behavior: "smooth"});
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
