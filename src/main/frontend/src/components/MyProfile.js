import React from "react";
import styled from "styled-components";
import RecentAlarm from "./RecentAlarm";

const Wrapper = styled.div`
  width: 1000px;
  height: 350px;
  border-radius: 20px;
  background: rgba(231, 235, 255, 0.80);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InformArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Name = styled.p`
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 23px;
  font-weight: 700;
`;
const Major = styled.p`
  margin-left: 20px;
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: 600;
  color: #808080;
`;

const Grade = styled.p`
  margin-top: 1px;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #808080;
`;
const AlarmArea = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;
function MyProfile() {
    return (
        <Wrapper>
            <InformArea>
                <Name>박정은 님</Name>
                <Major>컴퓨터소프트웨어공학과</Major>
                <Grade>4학년 YK반</Grade>
            </InformArea>
            <AlarmArea>
                <Title>알림</Title>
                <RecentAlarm/>
            </AlarmArea>
        </Wrapper>
    );
}

export default MyProfile;