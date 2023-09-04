import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import FacilityReservation from './pages/FacilityReservation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/facility-reservation" element={<FacilityReservation/>} />
      </Routes>
    </Router>
  );
}

export default App;
