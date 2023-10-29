import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import axios from "axios";
import {darken} from "polished";
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
  width: 500px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  position: relative;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 70px;
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
  background: none;
  margin-right: 15px;
`;
const ModalTitle = styled.p`
  font-size: 17px;
  padding-left: 15px;
  font-weight: 700;
`;
const ConfirmBtn = styled.button`
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookInfoArea = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-items: flex-start;
`;
const BookImage = styled.img`
  width: 130px;
  height: auto;
  margin-right: 20px;
`;

const BookTitle = styled.h3`
  font-size: 17px;
  margin: 10px 0;
`;
const ReviewInput = styled.textarea`
  width: 90%;
  min-height: 100px;
  margin: 20px 0;
  resize: none;
  border-radius: 10px;
  border: 1.5px solid #d3d3d3;
  padding: 10px;
`;

function BookReservationModal({isOpen, onClose, bookInfo}) {
    if (!isOpen) return null;

    const handleReserveConfirm = () => {

    };
    return (
        <ModalOverlay onClick={(e) => e.stopPropagation}>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>리뷰 작성</ModalTitle>
                    <CloseButton onClick={onClose}>X</CloseButton>
                </ModalHeader>
                <ContentArea>
                    <BookInfoArea>
                        <BookImage src={bookInfo.bookImage} alt="Book"/>
                        <BookTitle rows="4" cols="30">{bookInfo.bookTitle}</BookTitle>
                    </BookInfoArea>
                    <ReviewInput
                        placeholder="내용을 10자 이상 입력해주세요"/>
                </ContentArea>
                <ConfirmBtn onClick={handleReserveConfirm}>등록</ConfirmBtn>
            </ModalContent>
        </ModalOverlay>
    );
};


export default BookReservationModal;