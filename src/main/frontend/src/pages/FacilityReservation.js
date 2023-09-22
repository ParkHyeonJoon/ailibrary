//src/pages/FacilityReservation.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Room from "../components/Room";
import MyDatePicker from "../components/MyDatePicker";
import MyTimePicker from "../components/MyTimePicker";
import Button from "../common/Button";
import { searchFacility } from "../api/FacilityReserveapi"; // createReservation 함수 추가

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
`;

const Title = styled.p`
  text-align: left;
  color: #000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

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
  background: #eff2ff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border: none;
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:not(:last-child) {
    margin-right: 100px;
  }

  &:hover,
  &:focus {
    font-weight: 550;
    background: #a5b3ff;
    color: #fff;
  }
`;

const PickerArea = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
`;

function FacilityReservation() {
    const [selectedMenu, setSelectedMenu] = useState("스터디룸");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [searchResult, setSearchResult] = useState([]); // 배열로 초기화

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleFacilitySearch = async () => {
        try {
            if (!selectedDate || selectedTimes.length === 0) {
                console.error("날짜와 시간을 선택해주세요.");

                return; // 선택한 날짜나 시간이 없다면 더 이상 진행하지 않음
            }
            console.log(selectedMenu + " " + selectedDate + " " + selectedTimes)
            const result = await searchFacility(
                selectedMenu,
                selectedDate,
                selectedTimes,
            );
            setSearchResult(result);
        } catch (error) {
            console.error("시설 검색 오류:", error);
            console.log(selectedMenu + " " + selectedDate + " " + selectedTimes)
        }
    };

    useEffect(() => {
        handleFacilitySearch();
    }, [selectedMenu, selectedDate, selectedTimes]);

    return (
        <Wrapper>
            <Header />
            <Title>시설예약</Title>
            <RoomTypeArea>
                <RoomTypeBtn
                    onClick={() => handleMenuClick("스터디룸")}
                    style={selectedMenu === "스터디룸" ? { background: "#a5b3ff", color: "#fff" } : {}}
                >
                    스터디룸
                </RoomTypeBtn>
                <RoomTypeBtn
                    onClick={() => handleMenuClick("VR룸")}
                    style={selectedMenu === "VR룸" ? { background: "#a5b3ff", color: "#fff" } : {}}
                >
                    VR룸
                </RoomTypeBtn>
                <RoomTypeBtn
                    onClick={() => handleMenuClick("오디토리움")}
                    style={selectedMenu === "오디토리움" ? { background: "#a5b3ff", color: "#fff" } : {}}
                >
                    오디토리움
                </RoomTypeBtn>
            </RoomTypeArea>
            <PickerArea>
                <MyDatePicker onDateChange={(date) => setSelectedDate(date)} />
                <MyTimePicker
                    selectedTimes={selectedTimes}
                    setSelectedTimes={setSelectedTimes}
                />
            </PickerArea>

            {searchResult.map((roomData, index) => (
                <Room
                    key={index}
                    roomData={{...roomData,
                    date: selectedDate.toISOString().split('T')[0],
                    time: selectedTimes,}}

                />
            ))}
        </Wrapper>
    );
}

export default FacilityReservation;
