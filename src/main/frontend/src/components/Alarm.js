import React from "react";
import styled from "styled-components";
import axios from "axios";
const Wrapper = styled.div`
  width: 95%;
  height: 60px;
  border-radius: 10px;
  background: #EFF2FF;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
`;
const ContentArea = styled.div`
  margin: 10px;
  width: 80%;
`;

const Date = styled.p`
width: 20%;
`;
const DeleteBtn = styled.button`
`;
function Alarm({ notification, onDelete }) {
    const storedToken = localStorage.getItem('token');
    const handleDeleteClick = () => {
        // 알림 삭제 요청을 서버로 보냅니다.
        axios
            .put("http://localhost:8080/notification/delete", notification.notiId, {
                headers: {
                    'Authorization': storedToken,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                // 성공적으로 삭제된 경우
                onDelete(notification.notiId);
            })
            .catch((error) => {
                console.error("Error deleting notification: ", error);
            });
    };
    return (
        <Wrapper>
            <ContentArea>{notification.notiContent}</ContentArea>
            <DeleteBtn onClick={handleDeleteClick}>x</DeleteBtn>
            <Date>{notification.dateMessage}</Date>
        </Wrapper>
    );
}

export default Alarm;