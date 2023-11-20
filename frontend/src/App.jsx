import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import StartBet from './StartBet.jsx';
import AcceptBet from './AcceptBet.jsx';
import DecideBet from './DecideBet.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/start" element={<StartBet />} />
        <Route path="/accept" element={<AcceptBet />} />
        <Route path="/decide" element={<DecideBet />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;


