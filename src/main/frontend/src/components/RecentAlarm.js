import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Alarm from "./Alarm";
import axios from "axios";

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
    const [notifications, setNotifications] = useState([]);

    const storedToken = localStorage.getItem('token');
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    const userStuId = userInfo.userStuId;
    const fetchNotifications = () => {
        axios
            .post("http://localhost:8080/notification/list", userStuId, {
                headers: {
                    'Authorization': storedToken,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setNotifications(response.data);
            })
            .catch((error) => {
                console.error("Error fetching recent notifications: ", error);
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
            {notifications.map((notification) => (
                <Alarm key={notification.notiId} notification={notification} onDelete={handleDeleteNotification} />
            ))}
        </Wrapper>
    );
}

export default RecentAlarm;