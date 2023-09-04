import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Room from "../components/Room";
import MyDatePicker from "../components/MyDatePicker";
import MyTimePicker from "../components/MyTimePicker";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
const Title = styled.p`
    text-align: left;
    color: #000;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const RoomTypeArea = styled.div`
    justify-content: flex-end;
    align-items: center;
    display: flex;
    margin-bottom: 30px;
`;

const RoomTypeBtn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 30px;
    background: #EFF2FF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    border: none; /* 테두리 없애기 */    
    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    
    &:not(:last-child) {
        margin-right: 100px; /* 마지막 요소를 제외한 모든 요소에 마진 적용 */
    }

    &:hover, &:focus  {
        font-weight: 550;
        background: #A5B3FF;
        color: #fff;
    }
`;
const PickerArea = styled.div`
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;
function FacilityReservation() {
    const [selectedMenu, setSelectedMenu] = useState("스터디룸"); // 초기값: 추천도서

    const handleMenuClick = (menu) => {
      setSelectedMenu(menu);
    };

  return (
    <Wrapper>
        <Header/>
        <Title>시설예약</Title>
        <RoomTypeArea>
            <RoomTypeBtn onClick={() => handleMenuClick("스터디룸")}>스터디룸</RoomTypeBtn>
            <RoomTypeBtn onClick={() => handleMenuClick("VR룸")}>VR룸</RoomTypeBtn>
            <RoomTypeBtn onClick={() => handleMenuClick("오디토리움")}>오디토리움</RoomTypeBtn>
        </RoomTypeArea>
        <PickerArea>
            <MyDatePicker/>
            <MyTimePicker/>
        </PickerArea>
        <Room/>
    </Wrapper>
    );
}

export default FacilityReservation;