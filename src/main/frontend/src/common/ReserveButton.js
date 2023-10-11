import React, { useState, useEffect } from "react";

import styled from "styled-components";
import ReserveImg from "../assets/booking.png";

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
  magin: 0;
  padding: 0;
  font-size: 13px;
  font-family: Inter;
  font-weight: 800;
`;

const ReserveButton = ({ onClick }) => {
    return (
        <Wrapper onClick={onClick}>
            <Reserve src={ReserveImg} />
            <Text>예약</Text>
        </Wrapper>
    );
};

export default ReserveButton;