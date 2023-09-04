import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal"; // Modal 컴포넌트 import

const RoomWrapper = styled.div`
  margin-top: 30px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const RoomImage = styled.img`
  width: 130px;
  margin: 4px;
`;

const RoomFloor = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: bold;
  margin: 0px;
`;

const RoomType = styled.p`
  margin: 0px;
  color: #000;
  font-size: 12px;
`;

function Room() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [reservationInfo, setReservationInfo] = useState({}); // 예약 정보

  // Room 클릭 시 모달 열기
  const handleRoomClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달에서 예약하기 버튼 클릭 시
  const handleReservation = (date, time) => {
    // 예약 정보를 저장하거나 서버로 전송할 수 있습니다.
    setReservationInfo({ date, time });
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <RoomWrapper onClick={handleRoomClick}>
        <RoomImage src={`${process.env.PUBLIC_URL}/assets/room1.jpg`} alt="이미지" />
        <RoomFloor>2층</RoomFloor>
        <RoomType>스터디룸1</RoomType>
      </RoomWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onReservation={handleReservation} // 예약하기 버튼 클릭 시 콜백
      />
    </>
  );
}

export default Room;
