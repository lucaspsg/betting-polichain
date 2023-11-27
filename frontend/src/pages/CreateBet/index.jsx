import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const CreateBet = () => {
  const navigate = useNavigate();
  const [betDetails, setBetDetails] = useState({
    name: '',
    side1: '',
    side2: ''
  });

  const handleStartBet = () => {
  };

  return (
    <>
        <Navbar navigate={navigate} />
        <div className="start-bet-container centralize-content">
          <h2 className="betting-title">Create Bet</h2>
          <div className="input-container">
            <input
              className="bet-input"
              type="text"
              placeholder="Bet Name"
              value={betDetails.name}
              onChange={(e) => setBetDetails({ ...betDetails, name: e.target.value })}
            />
          </div>

        <div className="input-container">
          <input
            className="bet-input"
            type="text"
            placeholder="Outcome 1"
            value={betDetails.side1}
            onChange={(e) => setBetDetails({ ...betDetails, side1: e.target.value })}
          />
        </div>

        <div className="input-container">
          <input
            className="bet-input"
            type="text"
            placeholder="Outcome 2"
            value={betDetails.side2}
            onChange={(e) => setBetDetails({ ...betDetails, side2: e.target.value })}
          />
        </div>

          <button onClick={handleStartBet} className="start-bet-button" style={{ marginTop: '10px' }}>
            Create Bet
          </button>
        </div>
      <Footer/>
    </>
  );
};

export default CreateBet;
