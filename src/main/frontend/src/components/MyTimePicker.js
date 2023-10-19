//src/components/MyTimePicker.js
import React from "react";
import styled from "styled-components";

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TimeSlotRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const TimeSlotText = styled.p`
  font-size: 15px;
  margin-bottom: 0px;
`;

const AlertMessage = styled.p`
  font-size: 12px;
  margin-left: 10px;
  color: red;
  margin-top: 0;
`;

const TimeSlot = styled.div`
  padding: 4px 8px;
  margin: 5px;
  border: 1px solid #6F8FFF;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;

  ${({ selected }) =>
    selected &&
    `
    background-color: #6F8FFF;
    color: white;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    background-color: lightgray;
    cursor: not-allowed;
  `}
`;

const MyTimePicker = ({ selectedTimes, setSelectedTimes }) => {
  const maxSelections = 3;

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ];

  const handleTimeSelect = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else if (selectedTimes.length < maxSelections) {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
      <TimePickerContainer>
        <TimeSlotRow>
          {timeSlots.map((timeSlot, index) => (
              <TimeSlot
                  key={index}
                  selected={selectedTimes.includes(timeSlot)}
                  disabled={
                      !selectedTimes.includes(timeSlot) &&
                      selectedTimes.length >= maxSelections
                  }
                  onClick={() => handleTimeSelect(timeSlot)}
              >
                {timeSlot}
              </TimeSlot>
          ))}
        </TimeSlotRow>
        {selectedTimes.length >= maxSelections && (
            <AlertMessage>최대 {maxSelections}개까지 선택 가능합니다.</AlertMessage>
        )}
      </TimePickerContainer>
  );
};

export default MyTimePicker;
