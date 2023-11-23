// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import AcceptBet from './AcceptBet.jsx';
import Login from './Login.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/start"
          element={
            <React.Fragment>
              <Header />
            </React.Fragment>
          }
        />
        <Route path="/start/accept" element={<AcceptBet />} />
      </Routes>
    </Router>
  );
};

export default App;
