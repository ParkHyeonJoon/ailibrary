import React from "react";
import styled from "styled-components";
import Line from "../common/Line";
const ModalWrapper = styled.div`
  width: 300px;
  height: 400px;
  position: absolute;
  background: #ffffff;
  top: 57px;
  right: 0px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 30%;
  background: #eef1fe;
  padding-left: 20px;
  box-sizing: border-box;
  position: relative;
`;
const Name = styled.h3`
    font-size: 20px;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  font-size: 20px;
  padding: 10px;
`;
const ModalContent = styled.div`
  /* 모달 내용의 스타일을 정의하세요. */
`;
const MainModalAlarm =({count, userInfo, onClose})=> {
    return (
        <ModalWrapper>
            <Header>
                <Name>{userInfo.userName}</Name>
                <CloseBtn onClick={onClose}>x</CloseBtn>
            </Header>
            <Line/>
            <ModalContent>
                읽지 않은 알람: {count}

            </ModalContent>
        </ModalWrapper>
    );
}
export default MainModalAlarm;