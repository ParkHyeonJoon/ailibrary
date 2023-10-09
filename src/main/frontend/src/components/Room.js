//src/components/Room.js
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal"; // Modal 컴포넌트 import

const RoomWrapper = styled.div`
  margin-top: 0;
  margin-right: 70px;
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

function Room({roomData}) { // roomData 프로퍼티로 데이터 전달 받음
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [reservationInfo, setReservationInfo] = useState({}); // 예약 정보

  const date = roomData.date;
  const time = roomData.time;

  // Room 클릭 시 모달 열기
  const handleRoomClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달에서 예약하기 버튼 클릭 시
  const handleReservation = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <RoomWrapper onClick={handleRoomClick}>
        <RoomImage src={roomData.image} alt="이미지" /> {/* 이미지 프로퍼티 사용 */}
        <RoomFloor>{roomData.roomFloor}층</RoomFloor> {/* 층수 프로퍼티 사용 */}
        <RoomType>{roomData.roomName}</RoomType> {/* 이름 프로퍼티 사용 */}
      </RoomWrapper>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onReservation={handleReservation} // 예약하기 버튼 클릭 시 콜백
        date={roomData.date}
        time={roomData.time}
        roomData = {roomData}
      />
    </>
  );
}

export default Room;
