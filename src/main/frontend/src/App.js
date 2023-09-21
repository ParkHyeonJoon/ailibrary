import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PopularBooks from "./pages/PopularBooks";
import MyPage from "./pages/MyPage";
import BookDetail from "./pages/BookDetail";
import SearchResult from "./components/SearchResult"; // SearchResult 컴포넌트

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/facility-reservation" element={<FacilityReservation />} />
                <Route path="/popularbooks" element={<PopularBooks />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/book-detail/:bookId" element={<BookDetail />} />
                <Route path="/results/:keyword" element={<SearchResult />} /> {/* SearchResult 컴포넌트 라우트 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
