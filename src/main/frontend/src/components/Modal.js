import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 300px;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;    
    align-items: center;
`;
const ModalHeader = styled.div`
    background: #EFF2FF;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    justify-content: space-between; /* 오른쪽 정렬을 위한 설정 */
`;
const CloseButton = styled.button`
    border: none;
    cursor: pointer;
    margin-right: 5px;
`;
const ModalTitle = styled.p`
    font-size: 17px;
    padding-left: 15px;
    font-weight: 700;
`;
const ReservationBtn = styled.button`
    justify-content: center;
    background: #A5B3FF;
    color: #FFF;
    border: none;
    border-radius: 5px;
    width: 80%;
    height: 40px;
    margin-bottom: 10px;
`;
function Modal({ isOpen, onClose, onReservation }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
            <ModalTitle>예약 확인</ModalTitle>
            <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalHeader>
        <p>날짜: {date}</p>
        <p>시간: {time}</p>
        <p>위 시설을 예약하시겠습니까?</p>
        <ReservationBtn onClick={() => onReservation(date, time)}>예약하기</ReservationBtn>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
