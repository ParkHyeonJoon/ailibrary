import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
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

const ReserveButton = ({ bookId }) => {
    const [reservationStatus, setReservationStatus] = useState("예약 가능");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSource, setImageSource] = useState(ReservePos);
    const [buttonText, setButtonText] = useState("예약 가능");

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const userId = userInfo?.userId;
    const userStuId = userInfo?.userStuId;

    useEffect(() => {
        // 서버에서 예약 상태를 가져오는 요청
        axios.get(`http://localhost:8080/book/reserve?bookId=${bookId}&userStuId=${userStuId}`)
            .then((response) => {
                const newReservationStatus = response.data;
                setReservationStatus(newReservationStatus);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookId, userStuId]);

    useEffect(() => {
        // reservationStatus가 변경될 때 이미지와 텍스트 업데이트
        let newImageSource;
        let newButtonText;

        if (reservationStatus === "예약 가능") {
            newImageSource = ReservePos;
            newButtonText = "예약 가능";
        } else if (reservationStatus === "예약 중") {
            newImageSource = ReserveIm;
            newButtonText = "예약 중";
        } else if (reservationStatus === "예약 불가" || reservationStatus === "대출 중") {
            newImageSource = ReserveIm;
            newButtonText = "예약 불가";
        }

        setImageSource(newImageSource);
        setButtonText(newButtonText);
    }, [reservationStatus]);

    const handleButtonClick = () => {
        if (!userInfo) {
            alert("로그인이 필요합니다");
            return;
        } else if (reservationStatus === "예약 가능") {
            setIsModalOpen(true);
        } else {
            alert("예약이 불가한 도서입니다.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Wrapper onClick={handleButtonClick}>
                <Reserve src={imageSource} />
                <Text reservationStatus={reservationStatus}>{buttonText}</Text>
            </Wrapper>
            <BookReservationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                bookId={bookId}
            />
        </>
    );
};

export default ReserveButton;
