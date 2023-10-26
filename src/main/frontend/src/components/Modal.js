import React, {useState} from "react";
import styled from "styled-components";
import {createReservation} from "../api/FacilityReserveapi";
import {darken} from "polished";

const ModalOverlay = styled.div`
  margin-top: 70px;
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

  &:hover {
    background: ${(props) =>
            props.backgroundColor
                    ? darken(0.1, props.backgroundColor) // 어둡게 만드는 함수를 적용
                    : "#123456"};
    /* 원하는 다른 스타일 변경도 추가 가능 */
  }
`;
const ContentArea = styled.div`
  width: 270px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 15px;
  margin: 0;
`;
const StyledInput = styled.input`
  margin-top: 20px;
  border-radius: 5px;
  border: 0.5px solid black;
  height: 25px;
  width: 100px;
`;
function Modal({isOpen, onClose, onReservation, date, time, roomData}) {
    const rezDate = date;
    const rezTime = time;

    const [rezPeopleNum, setRezPeopleNum] = useState(3);

    const storedUserInfo = localStorage.getItem("userInfo");           // 로컬에 저장된 사용자 정보 가져오기
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    if (!isOpen) return null;

    const handleReservation = async () => {
        try {

            // createReservation 함수를 호출하여 예약 정보를 서버로 전송
            await createReservation(
                parseInt(rezPeopleNum, 10),
                rezDate,
                rezTime,
                roomData.roomId,
                parseInt(userInfo.userStuId, 10),
                userInfo.userName);

            alert("예약이 완료되었습니다.")
            onReservation();
            window.location.reload();
            console.log("예약이 성공적으로 완료되었습니다.");
        } catch (error) {
            console.error("예약 오류:", error);
            alert(error);
            window.location.reload();
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>예약 확인</ModalTitle>
                    <CloseButton onClick={onClose}>닫기</CloseButton>
                </ModalHeader>
                <ContentArea>
                    <Title>시설명</Title>
                    <p>{roomData.roomFloor}층 {roomData.roomName}</p>
                    <Title>날짜</Title>
                    <p>{rezDate}</p>
                    <Title>시간</Title>
                    {rezTime.map((slot, index) => (
                        <p key={index}>{slot}</p>
                    ))}

                    <Title> 참여인원</Title>
                    <StyledInput
                        type="text"
                        value={rezPeopleNum}
                        onChange={(e) => setRezPeopleNum(e.target.value)}

                    />
                </ContentArea>
                <p>위 시설을 예약하시겠습니까?</p>
                <ReservationBtn onClick={handleReservation}>예약하기</ReservationBtn>
            </ModalContent>
        </ModalOverlay>
    );
}

export default Modal;
