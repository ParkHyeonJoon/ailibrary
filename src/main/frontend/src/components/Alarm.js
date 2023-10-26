import React from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: 95%;
  height: 70px;
  color: black;
  border-radius: 10px;
  background: #EFF2FF;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  margin: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
const ContentArea = styled.div`
  margin: 10px;
  width: 80%;
`;
const Content = styled.p`
    margin-left: 10px;
`;

const Date = styled.p`
  margin: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  color: #707070;
  font-size: 14px;
`;
const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    color: ${(props) => props.hoverBackgroundColor || "#989898"};
    cursor: pointer;
  }
`;

function Alarm({ notification, onDelete, showDeleteButton }) {
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
            <ContentArea>
                <Content>{notification.notiContent}</Content>
            </ContentArea>
            {showDeleteButton && (
                <DeleteBtn onClick={handleDeleteClick}>x</DeleteBtn>
            )}
            <Date>{notification.dateMessage}</Date>
        </Wrapper>
    );
}

export default Alarm;