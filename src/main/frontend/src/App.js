// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PopularBooks from "./pages/PopularBooks";
import MyPage from "./pages/MyPage";
import BookDetail from "./pages/BookDetail";

function App() {
    // 추출한 정보를 상태로 관리
    const [userInfo, setUserInfo] = useState(null);

    // 로그인 상태를 저장하는 함수
    const handleLogin = (user) => {
        setUserInfo(user);
    };

    // 로그아웃 상태를 저장하는 함수
    const handleLogout = () => {
        setUserInfo(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main userInfo={userInfo} onLogout={handleLogout} />} />
                <Route path="/facility-reservation" element={<FacilityReservation userInfo={userInfo} />} />
                <Route path="/popularbooks" element={<PopularBooks userInfo={userInfo} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
                <Route path="/book-detail" element={<BookDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
