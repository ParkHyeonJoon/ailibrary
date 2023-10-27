import React, {useState, useRef} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
import {darken} from "polished";
import MyDatePicker from "./MyDatePicker";
import ReservePos from "../assets/reserve_pos.png";
import ReserveIm from "../assets/reserve_im.png";

const ModalOverlay = styled.div`
  margin-top: 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: black;
`;

const ModalContent = styled.div`
  width: 600px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  position: relative;
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
  background: none;
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
  }
`;
const ContentArea = styled.div`
  margin: 5px 20px;
`
const Textarea = styled.p`
  font-size: 13.5px;
  color: #696969;
  font-weight: 600;
  margin: 40px 5px 20px 5px;
`;
const StyledText = styled.p`
  font-size: 14px;
  color: #1e1e1e;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
`

function BookReservationModal({ isOpen, onClose }) {
    const [reservationStatus, setReservationStatus] = useState("예약 가능");
    const [selectedDate, setSelectedDate] = useState(null);
    const { bookId } = useParams();

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    if (!isOpen) return null;

    const handleReserveConfirm = () => {
        if (selectedDate) {
            const reserveDate = moment(selectedDate).format("YYYY-MM-DD");

            axios
                .post("http://localhost:8080/book/reserve", {
                    bookId: bookId,
                    bookRezDate: reserveDate,
                    userId: userInfo.userId,
                    userStuId: userInfo.userStuId
                })
                .then((response) => {
                    const reservationStatus = response.data;
                    if (reservationStatus === "예약 가능") {
                        setReservationStatus("예약 중");
                        alert("예약이 완료되었습니다");
                        onClose();
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert("예약 중 오류가 발생했습니다.");
                });
        } else {
            alert("예약 날짜를 선택해주세요.");
        }
    };

    return (
        <ModalOverlay onClick={(e) => e.stopPropagation}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>도서 예약 신청</ModalTitle>
                    <CloseButton onClick={onClose}>닫기</CloseButton>
                </ModalHeader>
                <ContentArea>
                    <StyledText>예약 유효일</StyledText>
                    <MyDatePicker
                        onDateChange={(date) => setSelectedDate(date)}
                        />
                    <Textarea>예약 유효일 이란?<br/>
                        입력한 날짜까지 예약한 도서를 대출하지 않으면, 이 도서는, 대출할 의사가 없다는 뜻입니다.<br/>
                        예약 유효일이 지난 후 예약은 자동 취소됩니다.</Textarea>
                </ContentArea>
                <ReservationBtn onClick={handleReserveConfirm}>신청하기</ReservationBtn>
            </ModalContent>
        </ModalOverlay>
    );
};


export default BookReservationModal;