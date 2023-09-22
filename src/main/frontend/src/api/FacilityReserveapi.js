// src/api/FacilityReservation.js

const API_BASE_URL = "http://localhost:8080";

// 시설 검색 API 요청 함수
export const searchFacility = async (selectedMenu, selectedDate, selectedTimes) => {
    const roomType = selectedMenu;
    const rezDate = selectedDate.toISOString();
    const rezTime = selectedTimes
    const storedToken = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/reserve/search?roomType=${roomType}&rezDate=${rezDate}&rezTime=${rezTime}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': storedToken,
            },
        });

        if (response.ok) {
            const data = await response.json();
            // 성공적인 응답 처리
            console.log('post 성공:', data);
            return data;
        } else {
            // 오류 응답 처리
            alert("실패")
            throw new Error("시설 검색에 실패했습니다.");
        }
    } catch (error) {
        // 오류 처리
        console.error("API 오류:", error);
        alert("오류" + storedToken)
        throw error;
    }
};

// 예약 생성 API 요청 함수
export const createReservation = async (rezPeopleNum, rezDate, rezTime, roomId, userStuId, userName) => {
    const storedToken = localStorage.getItem('token');
    const requestBody ={
        rezPeopleNum,
        rezDate,
        rezTime,
        roomId,
        userStuId,
        userName
    }
    try {
        const response = await fetch(`${API_BASE_URL}/reserve/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': storedToken,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            // 성공적인 응답 처리
            return "예약이 성공적으로 완료되었습니다.";
        } else {
            // 오류 응답 처리
            throw new Error("예약 생성에 실패했습니다.");
        }
    } catch (error) {
        // 오류 처리
        console.error("API 오류:", error);
        throw error;
    }
};
