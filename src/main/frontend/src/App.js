import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PopularAndNew from "./pages/PopularAndNew";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/facility-reservation" element={<FacilityReservation/>}/>
                <Route path="/popularnew" element={<PopularAndNew/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;
