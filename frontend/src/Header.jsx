// Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Header = () => {
  const navigate = useNavigate();
  const [betDetails, setBetDetails] = useState({
    name: '',
    participants: [''],
  });

  const handleInputChange = (index, value) => {
    const newParticipants = [...betDetails.participants];
    newParticipants[index] = value;
    setBetDetails({ ...betDetails, participants: newParticipants });
  };

  const handleAddParticipant = () => {
    setBetDetails({ ...betDetails, participants: [...betDetails.participants, ''] });
  };

  const handleStartBet = () => {
    navigate('/start/accept');
    //navigate('/accept');
  };

  return (
    <div className="start-bet-container centralize-content">
      <h2 className="betting-title">Betting Polichain</h2>
      <div className="input-container">
        <input
          className="bet-input"
          type="text"
          placeholder="Nome da aposta"
          value={betDetails.name}
          onChange={(e) => setBetDetails({ ...betDetails, name: e.target.value })}
        />
      </div>

      {betDetails.participants.map((participant, index) => (
        <div key={index} className="input-container">
          <input
            className="bet-input"
            type="text"
            placeholder={`Apostador ${String.fromCharCode(65 + index)}`}
            value={participant}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddParticipant} className="add-participant-button">
        Adicionar Apostador
      </button>

      <button onClick={handleStartBet} className="start-bet-button" style={{ marginTop: '10px' }}>
        Iniciar Aposta
      </button>
    </div>
  );
};

export default Header;

