import React from "react";
import styled from "styled-components";
import RecentAlarm from "./RecentAlarm";
import AllAlarm from "../pages/AllAlarm";

const Wrapper = styled.div`
  width: 80%;
  height: 350px;
  border-radius: 20px;
  background: #EFF2FFFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #000000;
`;

const InformArea = styled.div`
  width: 45%;
  padding: 30px;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Name = styled.p`
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
`;
const Major = styled.p`
  margin-left: 20px;
  margin-bottom: 3px;
  font-size: 14px;
  font-weight: 600;
  color: #424242;
`;

const Grade = styled.p`
  margin-top: 1px;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #424242;
`;
const AlarmArea = styled.div`
  width: 65%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;
const AllLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #cecece;
  font-size: 14px;
  position: absolute;
  right: 60px; /* 우측 정렬 */
  top: 65px; /* 상단 정렬 */
`;
function MyProfile() {

    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    return (
        <Wrapper>
            <InformArea>
                <Name>{userInfo.userName} 님</Name>
                <Major>{userInfo.userMajor}</Major>
                <Grade>{userInfo.userGrade}학년</Grade>
            </InformArea>
            <AlarmArea>
                <Title>알림</Title>
                <AllLink href="/allalarm">전체 알림>></AllLink>
                <RecentAlarm/>
            </AlarmArea>
        </Wrapper>
    );
}

export default MyProfile;