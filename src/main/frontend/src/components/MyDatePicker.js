import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const CustomDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 텍스트를 왼쪽으로 정렬 */
  justify-content: flex-start;
`;

const StyledDatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #6F8FFF;
  border-radius: 5px;
  padding: 2px 4px;
  margin: 5px;
`;

const StyledDatePicker = styled(DatePicker)`
  /* DatePicker 컴포넌트에 스타일을 직접 적용할 수 있습니다. */
  
  border: none;
  height: 25px;
  background-color: transparent;
  font-size: 15px;

  & .react-datepicker__header {
    background-color: transparent;
  }

  & .react-datepicker__day--selected {
    background-color: #007bff;
    color: #fff;
  }
`;

const CustomIcon = styled.div`
  /* 커스텀 아이콘의 스타일을 적용할 수 있습니다. */
  cursor: pointer;
  margin-right: 10px;
  color: #6F8FFF;
`;

const DateText = styled.span`
  font-size: 15px;
  display: flex; /* 왼쪽 정렬을 위해 추가 */
  align-items: center; /* 텍스트와 아이콘을 세로 중앙 정렬 */
`;

const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState();
  return (
    <CustomDatePicker>
      <DateText>날짜</DateText>
      <StyledDatePickerWrapper>
        <CustomIcon>
          <FontAwesomeIcon icon={faCalendar} />
        </CustomIcon>
        <StyledDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)} // 선택한 날짜를 상위 컴포넌트로 전달
            dateFormat="yyyy-MM-dd"
        />
      </StyledDatePickerWrapper>
    </CustomDatePicker>
  );
}

export default MyDatePicker;
