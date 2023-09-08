import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PopularBooks from "./pages/PopularBooks";
import NewBooks from "./pages/NewBooks";
import MyPage from "./pages/MyPage";
import BookDetail from "./pages/BookDetail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/facility-reservation" element={<FacilityReservation/>}/>
                <Route path="/popularbooks" element={<PopularBooks/>}/>
                <Route path="/newbooks" element={<NewBooks/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/mypage" element={<MyPage/>}/>
                <Route path="/book-detail" element={<BookDetail/>}/>
            </Routes>
        </Router>
    );
}

export default App;
