// AllAlarm.js
import React, {useState, useEffect} from "react";
import Alarm from "../components/Alarm";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

const Title = styled.p`
  text-align: left;
  color: #000000;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const AlarmArea = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border: 0.5px solid #cccccc;
  padding-top: 20px;
`;
const ContentWrapper = styled.div`
  width: 1000px;
  margin-top: 200px;
`;

function AllAlarm() {
    const [notifications, setNotifications] = useState([]);

    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userStuId = userInfo.userStuId;
    const fetchNotifications = () => {
        axios
            .post("http://localhost:8080/notification/all-list", userStuId, {
                headers: {
                    'Authorization': storedToken,
                    'Content-Type': 'application/json'
                }
            }) // 예시 학번
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error("Error fetching all notifications: ", error);
            });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleDeleteNotification = (notiId) => {
        // 알림 삭제 후, 알림 목록을 업데이트합니다.
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.notiId !== notiId)
        );
    };

    return (
        <Wrapper>
            <Header/>
            <ContentWrapper>
                <Title>전체 알림</Title>
                <AlarmArea>
                    {notifications.map((notification) => (
                        <Alarm key={notification.notiId}
                               notification={notification}
                               onDelete={handleDeleteNotification}
                               showDeleteButton={false}/>
                    ))}
                </AlarmArea>
            </ContentWrapper>
        </Wrapper>
    );
}

export default AllAlarm;
