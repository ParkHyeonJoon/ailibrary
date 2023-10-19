import React, {useState, useEffect} from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import ReservePos from "../assets/reserve_pos.png";
import ReserveIm from "../assets/reserve_im.png";
import BookReservationModal from "../components/BookReservationModal";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  margin-left: 30px;
  height: 70px;
  cursor: pointer;
`;

const Reserve = styled.img`
  margin-bottom: -10px;
`;

const Text = styled.p`
  padding: 0;
  font-size: 13px;
  font-family: Inter;
  font-weight: 800;

  ${(props) =>
          props.reservationStatus === "예약 가능" &&
          css`
            color: #27ff00;
          `}

  ${props =>
          (props.reservationStatus === "예약 불가" ||
                  props.reservationStatus === "예약 중" ||
                  props.reservationStatus === "대출 중") &&
          css`
            color: #ff0000;
          `}
`;

const ReserveButton = ({bookId, userId}) => {
        const [reservationStatus, setReservationStatus] = useState("예약가능");
        const [isModalOpen, setIsModalOpen] = useState(false);

        useEffect(() => {
            // 서버에서 예약 상태를 가져오는 요청
            axios.get(`http://localhost:8080/book/reserve?bookId=${bookId}&userId=${userId}`)
                .then((response) => {
                    const status = response.data;
                    setReservationStatus(status); // 예약 상태를 업데이트
                })
                .catch((error) => {
                    console.error(error);
                });
        }, [bookId, userId]);

        const handleButtonClick = () => {
            if (reservationStatus === "예약 가능") {
                setIsModalOpen(true);
            } else if (reservationStatus === "대출 중") {
                alert("현재 대출 중인 도서입니다");
            } else if (reservationStatus === "예약 중") {
                alert("다른 사용자가 예약 중인 도서입니다.");
            } else {
                alert("현재 대출이 가능한 도서입니다. 대출기능을 이용하세요.")
            }
        };


        const closeModal = () => {
            setIsModalOpen(false);
        };

        let imageSource;
        let buttonText;

        if (reservationStatus === "예약 가능") {
            imageSource = ReservePos;
            buttonText = "예약 가능";
        } else if (reservationStatus === "대출 중") {
            imageSource = ReserveIm;
            buttonText = "예약불가";
        } else if (reservationStatus === "예약 중") {
            imageSource = ReserveIm;
            buttonText = "예약불가";
        } else {
            imageSource = ReserveIm;
            buttonText = "예약불가";
        }

        return (
            <>
                <Wrapper onClick={handleButtonClick}>
                    <Reserve src={imageSource}/>
                    <Text reservationStatus={reservationStatus}>{buttonText}</Text>
                </Wrapper>
                <BookReservationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </>
        );
    }
;

export default ReserveButton;
