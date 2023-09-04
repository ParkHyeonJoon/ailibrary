import React from "react";
import styled from "styled-components";
import Line from "../common/Line";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`;

const OperatingHoursText = styled.p`
  color: #333;
  font-size: 14px;
`;

function OperatingHours() {
  return (
    <Wrapper>
        <Line/>
        <OperatingHoursText>운영시간: 9 AM - 6 PM</OperatingHoursText>
    </Wrapper>
  );
}

export default OperatingHours;