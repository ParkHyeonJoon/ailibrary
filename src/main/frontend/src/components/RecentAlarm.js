import React from "react";
import styled from "styled-components";
import Alarm from "./Alarm";

const Wrapper = styled.div`
  width: 95%;
  height: 270px;
  border-radius: 20px;
  background: white;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;


function RecentAlarm() {
    return (
        <Wrapper>
            <Alarm/>
        </Wrapper>
    );
}

export default RecentAlarm;