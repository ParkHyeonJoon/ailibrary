import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 95%;
  height: 60px;
  border-radius: 10px;
  background: #EFF2FF;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  margin: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ContentArea = styled.div`
  margin: 10px;
  width: 80%;
`;

const Date = styled.p`
width: 20%;
`;
function Alarm() {
    return (
        <Wrapper>
            <ContentArea>
                스터디룸 이용 예약이 완료되었습니다.
            </ContentArea>
            <Date>
                05/12 10:00
            </Date>
        </Wrapper>
    );
}

export default Alarm;